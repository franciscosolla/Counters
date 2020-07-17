import React, { useEffect } from 'react'
import { ScreenContainer } from '~/components'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, ThemeType } from '~/hooks'

export default SettingsScreen

export function SettingsScreen() {

    const [theme, setTheme] = useTheme()
    const styles = Styles(theme)

    return (
        <ScreenContainer >
            
            <TouchableOpacity style={styles.optionContainer} >
                <Text style={styles.optionTitle} >Theme</Text>
                <Text style={styles.optionValue} >{theme.name}</Text>
            </TouchableOpacity>

        </ScreenContainer>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        margin: 20,
        borderRadius: 5,
        backgroundColor: theme.color.secondaryBackground,
        padding: 10
    },
    optionTitle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.color.quaternary
    },
    optionValue: {
        marginRight: 20,
        color: theme.color.tertiaryText,
        fontWeight: '700',
        fontSize: 16
    }
})