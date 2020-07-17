import React from 'react'

import { ScreenContainer, CountersConfig, CounterEdit } from '~/components'
import { View } from 'react-native'

export default ConfigScreen

export function ConfigScreen() {
    return (
        <ScreenContainer >
            <CountersConfig />
            <CounterEdit />
        </ScreenContainer>
    )
}