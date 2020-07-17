import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'

import { Counter, useTheme, ThemeType, useTexts } from '~/hooks'

export default CounterView

interface CounterProps {
    counter: Counter,
    index: number,
    isSelected: boolean,
    onSelection?: (index: number) => void

    containerStyle?: StyleProp<ViewStyle>
}

export function CounterView({ counter, index, isSelected, onSelection, containerStyle }: CounterProps) {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CounterView')

    return (
        <TouchableOpacity
            style={[styles.container, containerStyle, isSelected ? undefined : { opacity: 0.4, borderColor: 'transparent' }]}
            onPress={() => onSelection && onSelection(index)}
            disabled={isSelected}
        >
            
            <Text style={[styles.title, isSelected ? undefined : { color: theme.color.text }]} >
                {texts.title}{index+1}
            </Text>

            <Text style={styles.value} >
                {('000'+counter.value).slice(-4)}
            </Text>

        </TouchableOpacity>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        backgroundColor: theme.color.secondaryBackground,
        marginHorizontal: 20,
        marginVertical: 15,
        padding: 10,
        borderColor: theme.color.tertiaryBackground,
        borderWidth: 2,
        borderRadius: 2,
        elevation: 5
    },
    title: {
        fontWeight: 'bold',
        color: theme.color.tertiaryText,
        marginBottom: 20,
        fontSize: 25
    },
    value: {
        color: theme.color.text,
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'right',
        margin: 10
    }
})