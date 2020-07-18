import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Store, Action } from '~/store'

import { useTheme, ThemeType, useCounters, useTexts } from '~/hooks'

import { Button } from './components'

export const CountersConfig = connect(mapStateToProps, mapDispatchToProps)(CountersConfigComponent)
export default CountersConfig

function mapStateToProps(store: Store) {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        onAdd: () => dispatch({ type: 'ADD_COUNTER_ASYNC' }),
        onRemove: () => dispatch({ type: 'REMOVE_COUNTER_ASYNC'})
    }
}

interface CountersConfigProps {
    onAdd: () => void
    onRemove: () => void
}

function CountersConfigComponent({ onAdd, onRemove }: CountersConfigProps) {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CountersConfig')

    return (
        <View style={styles.container} >

            <Text style={styles.title} >
                {texts.title}
            </Text>

            <View style={styles.buttonsContainer} >
                <Button text={texts.add} onPress={onAdd} />
                <View style={{ flex: 1 }} />
                <Button text={texts.remove} onPress={onRemove} />
            </View>
            
        </View>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        margin: 20,
        flex: 1
    },
    title: {
        color: theme.color.text,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row'
    }
})