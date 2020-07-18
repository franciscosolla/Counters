import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { useCounters, useSelected, ThemeType, useTheme, useTexts } from '~/hooks'

import CounterView from '../CounterView'
import { ResetIcon, MinusIcon, PlusIcon } from '../Icons'

export default CounterEdit

export function CounterEdit() {

    const [theme] = useTheme()
    const styles = Styles(theme)

    const [texts] = useTexts('components/CounterEdit')

    const [counters, actions] = useCounters()
    const [selected] = useSelected()

    if (!counters.length) return null

    return (
        <View style={styles.container} accessibilityLabel={texts.allyLabel} >

            <Text style={styles.title} >
                {texts.title}
            </Text>

            <CounterView
                containerStyle={styles.counterView} 
                counter={counters[selected]}
                index={selected}
                isSelected={true}
            />

            <View style={styles.actionContainer} >
                
                <TouchableOpacity style={[styles.actionButton, { flex: 10 }]} onPress={actions.resetSelected} >
                    <Text style={styles.actionTitle} >{texts.reset}</Text>
                    <ResetIcon color={theme.color.quaternaryText} />
                </TouchableOpacity>

                <View style={{ flex: 3 }} />

                <TouchableOpacity style={styles.actionButton} onPress={actions.decrementSelected} accessibilityLabel={texts.a11yDecrement} >
                    <MinusIcon color={theme.color.quaternaryText} />
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                <TouchableOpacity style={styles.actionButton} onPress={actions.incrementSelected} accessibilityLabel={texts.a11yIncrement} >
                    <PlusIcon color={theme.color.quaternaryText} />
                </TouchableOpacity>

            </View>
        
        </View>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        margin: 20
    },
    title: {
        color: theme.color.text,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    },
    counterView: {
        marginHorizontal: 0,
        marginVertical: 0
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    actionButton: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.color.secondaryBackground,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        elevation: 5
    },
    actionTitle: {
        color: theme.color.quaternaryText,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 18
    }
})