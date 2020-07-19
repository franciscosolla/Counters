import 'react-native';
import React from 'react';

import { render, fireEvent } from 'react-native-testing-library';

import { CountersConfig, CounterList } from '~/components'

import { useTextsRender } from '../hooks/useTexts.test';
import { useCountersRender } from '../hooks/useCounters.test';


describe('CountersConfig should', () => {

    it('be able to add new counters, and they should appear in the CounterList component', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CountersConfig')

        let previousCounters = c.current.counters

        const t2 = useTextsRender('components/CounterView')

        const { getAllByText } = render(<CounterList />)

        const counterTitle = new RegExp(`^${t2.current.texts.title}\\d*$`)

        let previousList = c.current.counters.length > 0 ? getAllByText(counterTitle) : []

        const { getByText } = render(<CountersConfig />)

        fireEvent.press(getByText(t.current.texts.add))

        expect(c.current.counters.length).toBe(previousCounters.length+1)

        expect(getAllByText(counterTitle).length).toBe(previousList.length+1)

    })

    it('be able to remove counters, and they should desappear from the CounterList component', async () => {

        const c = useCountersRender()

        const t = useTextsRender('components/CountersConfig')
        const { getByText } = render(<CountersConfig />)

        const t2 = useTextsRender('components/CounterView')
        const { getAllByText } = render(<CounterList />)
        
        while (c.current.counters.length < 2) {
            fireEvent.press(getByText(t.current.texts.add))
        }

        let previousCountersLength = c.current.counters.length

        expect(previousCountersLength).toBeGreaterThanOrEqual(1)

        const counterTitle = new RegExp(`^${t2.current.texts.title}\\d*$`)

        let previousList = getAllByText(counterTitle)

        fireEvent.press(getByText(t.current.texts.remove))

        expect(c.current.counters.length).toBe(previousCountersLength-1)

        expect(getAllByText(counterTitle).length).toBe(previousList.length-1)
    })
})