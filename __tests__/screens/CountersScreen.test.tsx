import 'react-native';
import React from 'react';

import { render, createTestStore } from 'jest/test-utils';

import { CountersScreen } from '~/screens'

import { useFocusEffect } from '@react-navigation/native'
jest.mock('@react-navigation/native')

import { useTextsRender } from '../hooks/useTexts.test'


describe('CountersScreen should', () => {

    it('render counters', () => {

        const t = useTextsRender('components/CounterView')

        const store = createTestStore({
            counterState: {
                counters: [{ value: 5 }, { value: 7 }],
                selected: 0
            }
        })

        const { queryAllByText } = render(<CountersScreen />, { store })

        const counterTitle = new RegExp(`^${t.current.texts.title}\\d$`)

        expect(store.getState().counterState.counters.length).toEqual(queryAllByText(counterTitle).length)
    })
})