import React, { ReactNode } from 'react'
import { View } from 'react-native'

export default ScreenContainer

interface ScreenContainerProps {
    children: ReactNode | ReactNode[]
}

export function ScreenContainer({ children }: ScreenContainerProps) {
    return (
        <View >
            { children }
        </View>
    )
}