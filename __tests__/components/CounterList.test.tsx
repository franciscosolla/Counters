import 'react-native';
import React from 'react';

import renderer, { act } from 'react-test-renderer';

import { render, fireEvent } from 'react-native-testing-library';
import { renderHook } from '@testing-library/react-hooks';

import { CounterList } from '~/components'

import { useFocusEffect } from '@react-navigation/native'
jest.mock('@react-navigation/native')

import { useCountersRender } from '../hooks/useCounters.test'
import { useTextsRender } from '../hooks/useTexts.test'

import { useCounters, useTexts } from '~/hooks';

describe('CounterList should', () => {

    it('show new counters in the list when counters are added', () => {

        const { current } = useCountersRender()
        
        const element = <CounterList />

        const { getAllByText, rerender } = render(element)

        let previousList = current.counters.length > 0 ? getAllByText(/^Counter \d*$|^Contador \d*$/) : []

        act(() => {
            current.actions.addCounter()
        })

        let newList = getAllByText(/^Counter \d*$|^Contador \d*$/)

        expect(newList.length).toBe(previousList.length+1)
    });

    it('remove counters from the list when counters are removed', () => {

        const { current } = useCountersRender()
        
        const element = <CounterList />

        const { getAllByText, rerender } = render(element)

        let previousList = current.counters.length > 0 ? getAllByText(/^Counter \d*$|^Contador \d*$/) : []

        if (previousList.length < 2) {
            act(() => {
                current.actions.addCounter()
            })
            act(() => {
                current.actions.addCounter()
            })
            previousList = current.counters.length > 0 ? getAllByText(/^Counter \d*$|^Contador \d*$/) : []
        }

        act(() => {
            current.actions.removeCounter()
        })
        
        let newList = current.counters.length > 0 ? getAllByText(/^Counter \d*$|^Contador \d*$/) : []

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

        getAllByText(/^Contador \d*$/)

        act(() => {
            t.current.setTexts('en')
        })

        getAllByText(/^Counter \d*$/)
    })

    it('show the empty component when there\'s no counters', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterList')

        while(c.current.counters.length) {
            act(() => {
                c.current.actions.removeCounter()
            })
        }

        const { getAllByText, rerender } = render(<CounterList />)

        getAllByText(t.current.texts.emptyListTitle)
    })
})