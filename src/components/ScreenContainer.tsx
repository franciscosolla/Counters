import React, { ReactNode } from 'react'
import { View } from 'react-native'

export default ScreenContainer

interface ScreenContainerProps {
    children: ReactNode | ReactNode[]
}

export function ScreenContainer({ children }: ScreenContainerProps) {
    return (
        <View style={{ flex: 1 }} >
            { children }
        </View>
    )
}