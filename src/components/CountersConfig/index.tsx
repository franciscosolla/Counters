import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from './components'
import { useTheme, ThemeType, useCounters, useTexts } from '~/hooks'

export default CountersConfig

export function CountersConfig() {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CountersConfig')

    const [_, addCounter, removeCounter] = useCounters()

    return (
        <View style={styles.container} >

            <Text style={styles.title} >
                {texts.title}
            </Text>

            <View style={styles.buttonsContainer} >
                <Button text={texts.add} onPress={addCounter} />
                <View style={{ flex: 1 }} />
                <Button text={texts.remove} onPress={removeCounter} />
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