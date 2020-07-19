import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { render, fireEvent } from 'react-native-testing-library';

import { CounterEdit, CounterList } from '~/components';

import { useCountersRender } from '../hooks/useCounters.test';
import { useTextsRender } from '../hooks/useTexts.test';


describe('CounterEdit should', () => {

    it('be able to increment selected counter and show updated value', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterEdit')

        if (c.current.counters.length === 0) {
            act(() => {
                c.current.actions.addCounter()
            })
        }

        const { getByText, getByA11yLabel } = render(<CounterEdit />)

        let previousValue = parseInt(getByText(/\d\d\d\d/).instance.props?.children)

        fireEvent.press(getByA11yLabel(t.current.texts.a11yIncrement))

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).toBe(previousValue+1)
    })

    it('be able to decrement selected counter and show updated value', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterEdit')

        if (c.current.counters.length === 0) {
            act(() => {
                c.current.actions.addCounter()
            })
        }

        if (c.current.counters[c.current.selected].value === 0) {
            act(() => {
                c.current.actions.incrementSelected()
            })
        }

        const { getByText, getByA11yLabel } = render(<CounterEdit />)

        let previousValue = parseInt(getByText(/\d\d\d\d/).instance.props?.children)

        fireEvent.press(getByA11yLabel(t.current.texts.a11yDecrement))

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).toBe(previousValue-1)
    })

    it('be able to reset the selected counter value an show updated value', () => {

        const c = useCountersRender()
        const t = useTextsRender('components/CounterEdit')

        if (c.current.counters.length === 0) {
            act(() => {
                c.current.actions.addCounter()
            })
        }

        if (c.current.counters[c.current.selected].value === 0) {
            act(() => {
                c.current.actions.incrementSelected()
            })
        }

        const { getByText } = render(<CounterEdit />)

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).not.toEqual(0)

        fireEvent.press(getByText(t.current.texts.reset))

        expect(parseInt(getByText(/\d\d\d\d/).instance.props?.children)).toBe(0)
    })

    it('be in sync with the counters shown in the CounterList component', () => {
        
        const c = useCountersRender()
        const t = {
            CounterEdit: useTextsRender('components/CounterEdit'),
            CounterView: useTextsRender('components/CounterView')
        } 

        while(c.current.counters.length < 2) {
            act(() => {
                c.current.actions.addCounter()
            })
        }

        const inCounterEdit = render(<CounterEdit />)
        
        const inCounterList = render(<CounterList />)

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