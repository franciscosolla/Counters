import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { render } from 'react-native-testing-library';

import { CounterList } from '~/components'

import { useFocusEffect } from '@react-navigation/native'
jest.mock('@react-navigation/native')

import { useCountersRender } from '../hooks/useCounters.test'
import { useTextsRender } from '../hooks/useTexts.test'

import { langs } from '~/hooks';


describe('CounterList should', () => {

    it('show new counters in the list when counters are added', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterView')
        
        const element = <CounterList />

        const { queryAllByText, rerender } = render(element)

        const counterTitle = new RegExp(`^${t.current.texts.title}\\d$`)

        let previousList = queryAllByText(counterTitle)

        act(() => {
            c.current.actions.addCounter()
        })

        let newList = queryAllByText(counterTitle)

        expect(newList.length).toBe(previousList.length+1)
    });

    it('remove counters from the list when counters are removed', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterView')
        
        const element = <CounterList />

        const { queryAllByText, rerender } = render(element)

        const counterTitle = new RegExp(`^${t.current.texts.title}\\d$`)

        let previousList = queryAllByText(counterTitle)

        if (previousList.length < 2) {
            act(() => {
                c.current.actions.addCounter()
            })
            act(() => {
                c.current.actions.addCounter()
            })
            previousList = queryAllByText(counterTitle)
        }

        act(() => {
            c.current.actions.removeCounter()
        })
        
        let newList = queryAllByText(counterTitle)

        expect(newList.length).toBe(previousList.length-1)
    });

    it('change language when a new language is setted', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterList')
        
        if (c.current.counters.length === 0) {
            act(() => {
                c.current.actions.addCounter()
            })
        }
        
        const element = <CounterList />

        const { getAllByText, rerender } = render(element)

        act(() => {
            t.current.setTexts('pt')
        })

        getAllByText(new RegExp(`^${langs.pt["components/CounterView"].title}\\d$`))

        act(() => {
            t.current.setTexts('en')
        })

        getAllByText(new RegExp(`^${langs.en["components/CounterView"].title}\\d$`))
    })

    it('show the empty component when there\'s no counters', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterList')

        while(c.current.counters.length) {
            act(() => {
                c.current.actions.removeCounter()
            })
        }

        const { getAllByText } = render(<CounterList />)

        getAllByText(t.current.texts.emptyListTitle)
    })
})