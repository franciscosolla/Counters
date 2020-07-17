import { useState, useEffect } from "react"
import { NativeModules, Platform, AsyncStorage } from 'react-native'
import { BehaviorSubject } from "rxjs"

import ptbr from "./pt"
import en from "./en"

export const langs = {
    'pt': ptbr,
    'en': en
}

export type LangsKeys = keyof typeof langs
export type TextsType = typeof langs[LangsKeys]
export type TextsKeys = keyof TextsType


const TEXTS = new BehaviorSubject<TextsType>(langs["pt"])

AsyncStorage.getItem('@device/lang').then(lang => {
    if (lang && Object.keys(langs).includes(lang)) setTEXTS(lang as LangsKeys, false)
    else {
        const locale = Platform.OS === 'ios' ?
            NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
        :
            NativeModules.I18nManager.localeIdentifier

        if (locale && locale instanceof String) {
            const lang = locale.slice(0,2)
            if (Object.keys(langs).includes(lang)) setTEXTS(lang as LangsKeys)
        }
    }
})

function setTEXTS(lang: LangsKeys, save: boolean = true) {
    if (save) AsyncStorage.setItem('@device/lang', lang)
    TEXTS.next(langs[lang])
}

export function useTexts<T extends TextsKeys>(key: T): [TextsType[T], typeof setTEXTS, typeof langs[LangsKeys]['code']] {
    const [texts, setTexts] = useState<TextsType[T]>(TEXTS.value[key])
    
    useEffect(() => {
        const subscription = TEXTS.subscribe((value) => setTexts(value[key]))
        return () => subscription.unsubscribe()
    }, [])
    
    return [texts, setTEXTS, TEXTS.value.code]
}