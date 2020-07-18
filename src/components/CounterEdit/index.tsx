import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Store, Action } from '~/store'

import { useCounters, useSelected, ThemeType, useTheme, useTexts } from '~/hooks'

import CounterView from '../CounterView'
import { ResetIcon, MinusIcon, PlusIcon } from '../Icons'

export const CounterEdit = connect(mapStateToProps, mapDispatchToProps)(CounterEditComponent)
export default CounterEdit

function mapStateToProps(store: Store) {    
    return {
        counter: store.counterState.counters.length > store.counterState.selected ? store.counterState.counters[store.counterState.selected] : null,
        index: store.counterState.selected
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        onIncrement: () => dispatch({ type: 'INCREMENT_SELECTED_ASYNC' }),
        onDecrement: () => dispatch({ type: 'DECREMENT_SELECTED_ASYNC' }),
        onReset: () => dispatch({ type: 'RESET_SELECTED_ASYNC' })
    }
}

interface CounterEditProps {
    
    counter: { value: number } | null,
    index: number

    onIncrement: () => void
    onDecrement: () => void
    onReset: () => void
}

function CounterEditComponent({ counter, index, onIncrement, onDecrement, onReset }: CounterEditProps) {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CounterEdit')

    if (!counter) return null

    return (
        <View style={styles.container} accessibilityLabel={texts.allyLabel} >

            <Text style={styles.title} >
                {texts.title}
            </Text>

            <CounterView
                containerStyle={styles.counterView} 
                counter={counter}
                index={index}
                isSelected={true}
            />

            <View style={styles.actionContainer} >
                
                <TouchableOpacity style={[styles.actionButton, { flex: 10 }]} onPress={onReset} >
                    <Text style={styles.actionTitle} >{texts.reset}</Text>
                    <ResetIcon color={theme.color.quaternaryText} />
                </TouchableOpacity>

                <View style={{ flex: 3 }} />

                <TouchableOpacity style={styles.actionButton} onPress={onDecrement} accessibilityLabel={texts.a11yDecrement} >
                    <MinusIcon color={theme.color.quaternaryText} />
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                <TouchableOpacity style={styles.actionButton} onPress={onIncrement} accessibilityLabel={texts.a11yIncrement} >
                    <PlusIcon color={theme.color.quaternaryText} />
                </TouchableOpacity>

            </View>
        
        </View>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        margin: 20
    },
    title: {
        color: theme.color.text,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    },
    counterView: {
        marginHorizontal: 0,
        marginVertical: 0
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    actionButton: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.color.secondaryBackground,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        elevation: 5
    },
    actionTitle: {
        color: theme.color.quaternaryText,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 18
    }
})