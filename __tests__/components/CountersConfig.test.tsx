import 'react-native';
import React from 'react';

import { render, fireEvent, createTestStore } from 'jest/test-utils';

import { CountersConfig, CounterList } from '~/components'

import { useTextsRender } from '../hooks/useTexts.test';


describe('CountersConfig should', () => {

    it('be able to add new counters, and they should appear in the CounterList component', () => {

        const t = useTextsRender('components/CountersConfig')

        const t2 = useTextsRender('components/CounterView')

        const store = createTestStore({
            counterState: {
                counters: [],
                selected: 0
            }
        })

        const CounterListEl = <CounterList />
        const { queryAllByText, rerender } = render(CounterListEl, { store })

        const counterTitle = new RegExp(`^${t2.current.texts.title}\\d*$`)

        let previousList = queryAllByText(counterTitle)

        const { getByText } = render(<CountersConfig />, { store })

        fireEvent.press(getByText(t.current.texts.add))
        rerender(CounterListEl)

        expect(queryAllByText(counterTitle).length).toBe(previousList.length+1)

    })

    it('be able to remove counters, and they should desappear from the CounterList component', async () => {

        const store = createTestStore({
            counterState: {
                counters: [{ value: 2 }, { value: 0 }],
                selected: 0
            }
        })

        const t = useTextsRender('components/CountersConfig')
        const { getByText } = render(<CountersConfig />, { store })

        const t2 = useTextsRender('components/CounterView')
        const { queryAllByText } = render(<CounterList />, { store })

        const counterTitle = new RegExp(`^${t2.current.texts.title}\\d*$`)

        let previousCountersLength = queryAllByText(counterTitle).length

        expect(previousCountersLength).toEqual(2)

        fireEvent.press(getByText(t.current.texts.remove))

        expect(queryAllByText(counterTitle).length).toBe(previousCountersLength-1)
    })
})