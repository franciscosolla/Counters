import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { render } from 'jest/test-utils';

import { CounterList } from '~/components'

import { useFocusEffect } from '@react-navigation/native'
jest.mock('@react-navigation/native')

import { useTextsRender } from '../hooks/useTexts.test'

import { langs } from '~/hooks';
import { createTestStore } from 'jest/test-utils';


describe('CounterList should', () => {

    it('show new counters in the list when counters are added', () => {

        const t = useTextsRender('components/CounterView')
        
        const store = createTestStore({
            counterState: {
                counters: [],
                selected: 0
            }
        })

        const { queryAllByText } = render(<CounterList />, { store })

        const counterTitle = new RegExp(`^${t.current.texts.title}\\d$`)

        let previousList = queryAllByText(counterTitle)

        act(() => {
            store.dispatch({ type: 'ADD_COUNTER' })
        })

        let newList = queryAllByText(counterTitle)

        expect(newList.length).toBe(previousList.length+1)
    });

    it('remove counters from the list when counters are removed', () => {

        const t = useTextsRender('components/CounterView')
        
        const store = createTestStore({
            counterState: {
                counters: [{ value: 10 }, { value: 32 }],
                selected: 1
            }
        })

        const { queryAllByText } = render(<CounterList />, { store })

        const counterTitle = new RegExp(`^${t.current.texts.title}\\d$`)

        let previousList = queryAllByText(counterTitle)

        act(() => {
            store.dispatch({ type: 'REMOVE_COUNTER' })
        })
        
        let newList = queryAllByText(counterTitle)

        expect(newList.length).toBe(previousList.length-1)
    });

    it('change language when a new language is setted', () => {

        const t = useTextsRender('components/CounterList')

        const { getAllByText } = render(
            <CounterList />,
            {
                initialState: {
                    counterState: {
                        counters: [{ value: 0 }],
                        selected: 0
                    }
                }
            }
        )

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

        const t = useTextsRender('components/CounterList')

        const { getByText } = render(<CounterList />)

        getByText(t.current.texts.emptyListTitle)
    })
})