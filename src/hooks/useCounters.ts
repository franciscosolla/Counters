import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { BehaviorSubject } from 'rxjs'
import { useSelected } from './useSelected'

export interface Counter {
    value: number
}

const COUNTERS = new BehaviorSubject<Counter[]>([])

AsyncStorage.getItem('@user/counters').then(counters => {
    if (counters) setCOUNTERS(JSON.parse(counters), false)
})

function setCOUNTERS(newValue: Counter[], save: boolean = true) {
    COUNTERS.next(newValue)
    if (save) AsyncStorage.setItem('@user/counters', JSON.stringify(newValue))
}

export function useCounters(): [Counter[], typeof actions, number] {

    const [counters, setCounters] = useState(COUNTERS.value)
    const [selected, setSelected] = useSelected()

    useEffect(() => {
        const subscription = COUNTERS.subscribe(setCounters)
        return () => subscription.unsubscribe()
    }, [])

    const addCounter = () => {
        const newCounters = counters.concat([{ value: 0 }])
        setCOUNTERS(newCounters)
        setSelected(newCounters.length-1)
    }

    const removeCounter = () => {        
        if (counters.length > 0) {
            counters.splice(selected, 1)
            setCOUNTERS([ ...counters ])
            setSelected(selected > 0 ? selected-1 : 0)
        }
    }

    const incrementSelected = () => {
        if (counters.length > selected && counters[selected].value < 9999) {
            counters[selected].value = counters[selected].value + 1
            setCOUNTERS([...counters])
        }
    }

    const decrementSelected = () => {
        if (counters.length > selected && counters[selected].value > 0) {
            counters[selected].value--
            setCOUNTERS([...counters])
        }
    }

    const resetSelected = () => {
        if (counters.length > selected && counters[selected].value !== 0) {
            counters[selected].value = 0
            setCOUNTERS([...counters])
        }
    }

    const actions = {
        addCounter,
        removeCounter,
        incrementSelected,
        decrementSelected,
        resetSelected
    }

    return [
        counters,
        actions,
        selected
    ]
}