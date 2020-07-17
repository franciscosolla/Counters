import React from 'react'

import { ScreenContainer, CounterList } from '~/components'

export default CountersScreen

export function CountersScreen() {
    return (
        <ScreenContainer >
            <CounterList />
        </ScreenContainer>
    )
}