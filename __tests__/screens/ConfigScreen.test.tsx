import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { render, fireEvent } from 'react-native-testing-library';

import { ConfigScreen } from '~/screens'

import { useFocusEffect } from '@react-navigation/native'
jest.mock('@react-navigation/native')

import { useCountersRender } from '../hooks/useCounters.test'
import { useTextsRender } from '../hooks/useTexts.test'

describe('CountersScreen should', () => {

    it('render new selected counter when new counter is added', () => {

        const c = useCountersRender()
        const t = {
            CounterView: useTextsRender('components/CounterView'),
            CountersConfig: useTextsRender('components/CountersConfig')
        } 
        
        const { getByText } = render(<ConfigScreen />)

        while (c.current.counters.length < 2) {
            fireEvent.press(getByText(t.CountersConfig.current.texts.add))
        }

        getByText(new RegExp(`^${t.CounterView.current.texts.title}${c.current.selected+1}$`))

        act(() => {
            fireEvent.press(getByText(t.CountersConfig.current.texts.add))
        })

        getByText(new RegExp(`^${t.CounterView.current.texts.title}${c.current.selected+1}$`))
    })

    it('not render counter when there\'s no counters', () => {

        const c = useCountersRender()
        const t = {
            CounterEdit: useTextsRender('components/CounterEdit'),
            CountersConfig: useTextsRender('components/CountersConfig')
        } 

        const { getByText, queryByA11yLabel } = render(<ConfigScreen />)

        while (c.current.counters.length > 0) {
            fireEvent.press(getByText(t.CountersConfig.current.texts.remove))
        }

        expect(queryByA11yLabel(t.CounterEdit.current.texts.allyLabel)).toBeNull()

    })
})