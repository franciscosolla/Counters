import React, { useEffect } from 'react'
import { ScreenContainer } from '~/components'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme, ThemeType, Themes, useTexts, langs } from '~/hooks'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootParamList } from './ParamLists'
import { useNavigation } from '@react-navigation/native'

export default SettingsScreen

type SettingsNavigationProp = StackNavigationProp<RootParamList, 'Settings'>

export function SettingsScreen() {

    const [theme, setTheme] = useTheme()
    const styles = Styles(theme)

    const [texts, setTexts] = useTexts('screens/Settings')

    const navigation = useNavigation<SettingsNavigationProp>()

    const onThemePicker = () => navigation.navigate('Picker', {
        title: texts.selectTheme,
        data: Object.values(Themes).map(t => ({ 
            text: texts.themes[t.name], 
            value: t.name 
        })), 
        onPick: (item) => Promise.resolve(setTheme(item.value))
    })

    const onLangPicker = () => navigation.navigate(
        'Picker', 
        { 
            title: texts.selectLanguage,
            data: Object.values(langs).map(lang => ({ 
                text: lang.language, 
                value: lang.code 
            })), 
            onPick: (item) => Promise.resolve(setTexts(item.value))
        }
    )

    return (
        <ScreenContainer >
            
            <TouchableOpacity style={styles.optionContainer} onPress={onThemePicker} >
                <Text style={styles.optionTitle} >{texts.theme}</Text>
                <Text style={styles.optionValue} >{texts.themes[theme.name]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={onLangPicker} >
                <Text style={styles.optionTitle} >{texts.language}</Text>
                <Text style={styles.optionValue} >{texts.languageValue}</Text>
            </TouchableOpacity>

        </ScreenContainer>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        margin: 20,
        marginBottom: 0,
        borderRadius: 5,
        backgroundColor: theme.color.secondaryBackground,
        padding: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5
    },
    optionTitle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.color.quaternaryText
    },
    optionValue: {
        marginRight: 20,
        color: theme.color.tertiaryText,
        fontWeight: '700',
        fontSize: 16
    }
})