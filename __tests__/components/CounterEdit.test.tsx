import 'react-native';
import React from 'react';

import { render, fireEvent, createTestStore } from 'jest/test-utils';

import { useTextsRender } from '../hooks/useTexts.test';


import { CounterEdit, CounterList } from '~/components';


describe('CounterEdit should', () => {

    it('be able to increment selected counter and show updated value', () => {

        const t = useTextsRender('components/CounterEdit')

        const { getByText, getByA11yLabel } = render(
            <CounterEdit />,
            {
                initialState: {
                    counterState: {
                        counters: [{ value: 0 }],
                        selected: 0
                    }
                }
            }
        )

        let previousValue = parseInt(getByText(/\d\d\d\d/).instance.props?.children)

        fireEvent.press(getByA11yLabel(t.current.texts.a11yIncrement))

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).toBe(previousValue+1)
    })

    it('be able to decrement selected counter and show updated value', () => {

        const t = useTextsRender('components/CounterEdit')

        const { getByText, getByA11yLabel } = render(
            <CounterEdit />,
            {
                initialState: {
                    counterState: {
                        counters: [{ value: 10 }],
                        selected: 0
                    }
                }
            }
        )

        let previousValue = parseInt(getByText(/\d\d\d\d/).instance.props?.children)

        fireEvent.press(getByA11yLabel(t.current.texts.a11yDecrement))

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).toBe(previousValue-1)
    })

    it('be able to reset the selected counter value an show updated value', () => {

        const t = useTextsRender('components/CounterEdit')

        const { getByText } = render(
            <CounterEdit />,
            {
                initialState: {
                    counterState: {
                        counters: [{ value: 10 }],
                        selected: 0
                    }
                }
            }
        )

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).not.toEqual(0)

        fireEvent.press(getByText(t.current.texts.reset))

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).toBe(0)
    })

    it('be in sync with the counters shown in the CounterList component', () => {
        
        const t = {
            CounterEdit: useTextsRender('components/CounterEdit'),
            CounterView: useTextsRender('components/CounterView')
        } 

        const store = createTestStore({
            counterState: {
                counters: [{ value: 10 }, { value: 32 }],
                selected: 1
            }
        })

        const inCounterEdit = render(<CounterEdit />, { store })
        
        const inCounterList = render(<CounterList />, { store })

        // test equality before operations

        let valueInCounterEdit = parseInt(inCounterEdit.getByText(/\d\d\d\d/).props.children)

        let valueInCounterList = parseInt(inCounterList.getByA11yLabel(t.CounterView.current.texts.a11ySelected).find(e => /\d\d\d\d/.test(e.props.children)).props.children)

        expect(valueInCounterList).toEqual(valueInCounterEdit)

        // test equality after increment (pressed twice to test the reset action afterwards)

        fireEvent.press(inCounterEdit.getByA11yLabel(t.CounterEdit.current.texts.a11yIncrement))
        fireEvent.press(inCounterEdit.getByA11yLabel(t.CounterEdit.current.texts.a11yIncrement))

        valueInCounterEdit = parseInt(inCounterEdit.getByText(/\d\d\d\d/).props.children)

        valueInCounterList = parseInt(inCounterList.getByA11yLabel(t.CounterView.current.texts.a11ySelected).find(e => /\d\d\d\d/.test(e.props.children)).props.children)

        expect(valueInCounterList).toEqual(valueInCounterEdit)

        // test equality after decrement

        fireEvent.press(inCounterEdit.getByA11yLabel(t.CounterEdit.current.texts.a11yDecrement))

        valueInCounterEdit = parseInt(inCounterEdit.getByText(/\d\d\d\d/).props.children)

        valueInCounterList = parseInt(inCounterList.getByA11yLabel(t.CounterView.current.texts.a11ySelected).find(e => /\d\d\d\d/.test(e.props.children)).props.children)

        expect(valueInCounterList).toEqual(valueInCounterEdit)

        // test equality after reset

        fireEvent.press(inCounterEdit.getByText(t.CounterEdit.current.texts.reset))

        valueInCounterEdit = parseInt(inCounterEdit.getByText(/\d\d\d\d/).props.children)

        valueInCounterList = parseInt(inCounterList.getByA11yLabel(t.CounterView.current.texts.a11ySelected).find(e => /\d\d\d\d/.test(e.props.children)).props.children)

        expect(valueInCounterList).toEqual(valueInCounterEdit)

    })
})