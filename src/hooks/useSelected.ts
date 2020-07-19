import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { BehaviorSubject } from 'rxjs'

const SELECTED = new BehaviorSubject<number>(0)

AsyncStorage.getItem('@user/selected').then(selected => {
    if (selected) setSELECTED(JSON.parse(selected), false)
})

function setSELECTED(newValue: number, save: boolean = true) {
    SELECTED.next(newValue)
    if (save) AsyncStorage.setItem('@user/selected', JSON.stringify(newValue))
}

export function useSelected(): [number, (index: number) => void] {

    const [selected, setSelected] = useState(SELECTED.value)

    useEffect(() => {
        const subscription = SELECTED.subscribe(setSelected)
        return () => subscription.unsubscribe()
    }, [])

    return [
        selected, 
        setSELECTED
    ]
}