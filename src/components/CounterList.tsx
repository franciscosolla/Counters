import React, { useState, useRef, useEffect } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'

import { useCounters, useSelected, useTheme, useTexts, ThemeType } from '~/hooks'

import CounterView from './CounterView'

export const CounterList = connect(mapStateToProps, mapDispatchToProps)(CounterListComponent)
export default CounterList

function mapStateToProps(store: any) {
    return {
        counters: store.counterState.counters,
        selected: store.counterState.selected
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        onSelect: (index: number) => dispatch({ type: 'SELECT_COUNTER_ASYNC', index })
    }
}

const ITEM_HEIGHT = 231.5

interface CounterListProps {
    
    counters: { value: number }[]
    selected: number

    onSelect: (index: number) => void
}

function CounterListComponent({ counters, selected, onSelect }: CounterListProps) {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CounterList')

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
                    onSelection={onSelect}
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
        elevation: 5,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5
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