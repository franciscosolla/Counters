import React, { useMemo, useEffect } from 'react'
import { FlatList, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import { RootParamList } from './ParamLists'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreenContainer } from '~/components'
import { ThemeType, useTheme } from '~/hooks'

export default PickerScreen

type PickerScreenRouteProp = RouteProp<RootParamList, 'Picker'>
type PickerScreenNavigationProp = StackNavigationProp<RootParamList, 'Picker'>

export function PickerScreen() {

    const navigation = useNavigation<PickerScreenNavigationProp>()
    const route = useRoute<PickerScreenRouteProp>()

    const [theme] = useTheme()
    const styles = Styles(theme)

    useFocusEffect(() => {
        if (route.params.title) {
            navigation.setOptions({
                title: route.params.title,
            })
        }
    })

    return (
        <ScreenContainer >
            <FlatList 
                data={route.params.data}
                keyExtractor={(item, index) => index+':'+item.text}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                        onPick={() => route.params.onPick(item).then(navigation.goBack)}
                        containerStyle={styles.itemContainer}
                        textStyle={styles.itemText}
                    />
                )}
            />
        </ScreenContainer>
    )
}

const Styles = (theme: ThemeType) => StyleSheet.create({
    itemContainer: {
        backgroundColor: theme.color.secondaryBackground,
        margin: 10,
        padding: 15,
        borderRadius: 10
    },
    itemText: {
        color: theme.color.quaternaryText,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }
})

////////////////////////////////////////

interface ItemProps {
    item: {
        text: string,
        value: any
    }
    onPick: () => void

    containerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

function Item({ item, onPick, containerStyle, textStyle }: ItemProps) {
    return (
        <TouchableOpacity style={containerStyle} onPress={onPick} >
            <Text style={textStyle} >
                {item.text}
            </Text>
        </TouchableOpacity>
    )
}

