import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { render } from 'react-native-testing-library';

import { CountersScreen } from '~/screens'

import { useFocusEffect } from '@react-navigation/native'
jest.mock('@react-navigation/native')

import { useCountersRender } from '../hooks/useCounters.test'
import { useTextsRender } from '../hooks/useTexts.test'


describe('CountersScreen should', () => {

    it('render counters', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterView')

        while (c.current.counters.length < 2) {
            act(() => {
                c.current.actions.addCounter()
            })
        }

        const { queryAllByText } = render(<CountersScreen />)

        const counterTitle = new RegExp(`^${t.current.texts.title}\\d$`)

        expect(c.current.counters.length).toEqual(queryAllByText(counterTitle).length)
    })
})