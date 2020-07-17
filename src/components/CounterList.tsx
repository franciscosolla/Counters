import React, { useState } from 'react'
import { FlatList } from 'react-native'

import { useCounters, useSelected } from '~/hooks'

import CounterView from './CounterView'

export default CounterList

export function CounterList() {

    const [counters] = useCounters()
    const [selected, setSelected] = useSelected()

    return (
        <FlatList
            data={counters}
            keyExtractor={(_, index) => index.toString()}
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