import React, { useState, useRef, useEffect } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useCounters, useSelected, useTheme, useTexts, ThemeType } from '~/hooks'

import CounterView from './CounterView'

export default CounterList

const ITEM_HEIGHT = 231.5

export function CounterList() {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CounterList')

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
            contentContainerStyle={{
                paddingVertical: 20
            }}
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
            ListEmptyComponent={(
                <View style={styles.emptyListContainer} >
                    <Text style={styles.emptyListTitle} >
                        {texts.emptyListTitle}
                    </Text>
                    <Text style={styles.emptyListInfo} >
                        {texts.emptyListInfo}
                    </Text>
                </View>
            )}
        />
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    emptyListContainer: {
        margin: 20,
        backgroundColor: theme.color.secondaryBackground,
        padding: 20,
        borderRadius: 5,
        elevation: 5
    },
    emptyListTitle: {
        textAlign: 'center',
        color: theme.color.text,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    emptyListInfo: {
        textAlign: 'center',
        fontSize: 16,
        color: theme.color.text
    }
})