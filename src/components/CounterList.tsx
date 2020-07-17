import React, { useState, useRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useCounters, useSelected } from '~/hooks'

import CounterView from './CounterView'

export default CounterList

const ITEM_HEIGHT = 220.5

export function CounterList() {

    const navigation = useNavigation()

    const [counters] = useCounters()
    const [selected, setSelected] = useSelected()

    const listRef = useRef<FlatList>(null)

    useFocusEffect(() => {
        if (listRef.current && counters.length > selected) {
            listRef.current.scrollToIndex({ index: selected, viewPosition: 0.5 })
        }
    })

    return (
        <FlatList
            ref={listRef}
            data={counters}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index
            })}
            renderItem={({ item, index, }) => (
                <CounterView
                    counter={item}
                    index={index}
                    isSelected={selected === index}
                    onSelection={setSelected} 
                />
            )}
        />
    )
}