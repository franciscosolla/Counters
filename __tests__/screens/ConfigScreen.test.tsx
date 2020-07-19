import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { render, fireEvent, createTestStore } from 'jest/test-utils';

import { ConfigScreen } from '~/screens'

import { useTextsRender } from '../hooks/useTexts.test'


describe('CountersScreen should', () => {

    it('render new selected counter when new counter is added', () => {

        const t = {
            CounterView: useTextsRender('components/CounterView'),
            CountersConfig: useTextsRender('components/CountersConfig')
        } 
        
        const store = createTestStore({
            counterState: {
                counters: [{ value: 11 }, { value: 27 }],
                selected: 1
            }
        })

        const { getByText } = render(<ConfigScreen />, { store })

        getByText(new RegExp(`^${t.CounterView.current.texts.title}${store.getState().counterState.selected+1}$`))

        act(() => {
            fireEvent.press(getByText(t.CountersConfig.current.texts.add))
        })

        getByText(new RegExp(`^${t.CounterView.current.texts.title}${store.getState().counterState.selected+1}$`))
    })

    it('not render counter when there\'s no counters', () => {

        const t = {
            CounterEdit: useTextsRender('components/CounterEdit'),
            CountersConfig: useTextsRender('components/CountersConfig')
        } 

        const { getByText, queryByA11yLabel } = render(<ConfigScreen />)

        expect(queryByA11yLabel(t.CounterEdit.current.texts.allyLabel)).toBeNull()

    })
})