import { useState, useEffect } from "react"
import AsyncStorage from '@react-native-community/async-storage'
import { BehaviorSubject } from "rxjs"
import Constants from 'expo-constants'

function changeNavigationBarColor(color: string, light: boolean, animated: boolean) {
    if (Constants.appOwnership !== 'expo') {
        require('react-native-navigation-bar-color').default(color, light, animated)
    }
}

import lightTheme from './light'
import darkTheme from "./dark"

export const Themes = {
    light: lightTheme,
    dark: darkTheme
}

export type ThemeKeys = keyof typeof Themes
export type ThemeType = typeof Themes[ThemeKeys]

const defaultTheme = lightTheme

const THEME = new BehaviorSubject<ThemeType>(defaultTheme)
changeNavigationBarColor(defaultTheme.color.primary, defaultTheme.navBarLightSetting, false)

AsyncStorage.getItem('@device/theme').then(theme => {
    if (theme && Object.keys(Themes).includes(theme)) setTHEME(theme as ThemeKeys, false)
})

function setTHEME(theme: ThemeKeys, save: boolean = true) {
    if (save) AsyncStorage.setItem('@device/theme', theme)
    THEME.next(Themes[theme])
    changeNavigationBarColor(Themes[theme].color.primary, Themes[theme].navBarLightSetting, save)
}

export function useTheme(): [ThemeType, typeof setTHEME, typeof Themes[ThemeKeys]['name']] {

    const [theme, setTheme] = useState<ThemeType>(THEME.value)
    
    useEffect(() => {
        const subscription = THEME.subscribe(setTheme)
        return () => subscription.unsubscribe()
    }, [])
    
    return [theme, setTHEME, theme.name]
}