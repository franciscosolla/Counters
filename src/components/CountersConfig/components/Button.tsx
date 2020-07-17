import React from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'

import { useTheme, ThemeType } from '~/hooks'


export default Button

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    text: string
    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export function Button({ text, containerStyle, textStyle, ...props }: ButtonProps) {

    const [theme] = useTheme()
    const styles = Styles(theme)

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} { ...props } >
            <Text style={[styles.text, textStyle]} >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        backgroundColor: theme.color.secondaryBackground,
        flex: 6,
        padding: 10,
        borderRadius: 5,
        elevation: 5
    },
    text: {
        color: theme.color.quaternary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})