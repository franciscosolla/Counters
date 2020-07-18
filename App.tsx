import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar';

import { CountersScreen, ConfigScreen, SettingsScreen, PickerScreen } from '~/screens';
import { useTheme, ThemeType, useTexts } from '~/hooks';
import { StarIcon, SettingsIcon, ListIcon, TimerIcon } from '~/components';


import { sh } from '~/utils';

// Root Navigator ////////////////////////////////////////////////////////////

const Stack = createStackNavigator()

export default function App() {

  const [theme] = useTheme()
  const [texts, setTexts, textCode] = useTexts('app')

  const navigationTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.color.tertiary,
      background: theme.color.background,
      card: theme.color.primary,
      text: theme.color.secondaryText,
      border: 'transparent',
      notification: theme.color.primary,
    }
  }

  return (
    <NavigationContainer theme={navigationTheme} >
      <StatusBar style='light' />
      <Stack.Navigator
        mode='modal'
        initialRouteName='TabNav'
      >
        <Stack.Screen name='TabNav' component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='Settings' component={SettingsScreen} options={{ title: texts.Settings, ...TransitionPresets.ModalPresentationIOS, headerBackTitle: textCode === 'pt' ? 'Voltar' : '' }} />
        <Stack.Screen name='Picker' component={PickerScreen} options={{ ...TransitionPresets.ModalPresentationIOS, headerBackTitle: textCode === 'pt' ? 'Voltar' : ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// Tab Navigator ////////////////////////////////////////////////////////////

const Tab = createBottomTabNavigator()

function TabNavigator() {

  const [texts] = useTexts('app')

  return (
    <Tab.Navigator
      initialRouteName='CountersNav'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          route.name === 'CountersNav' ?
            <ListIcon size={sh(0.045)} color={color} /> 
          : 
            <TimerIcon size={sh(0.045)} color={color} />  
        )
      } as BottomTabNavigationOptions)}
      tabBarOptions={{
        style: { height: sh(0.1) },
        tabStyle: { paddingBottom: sh(0.02), paddingTop: sh(0.01) }
      }}
    >
      <Tab.Screen name='CountersNav' component={CountersNavigator} options={{ title: texts.Counters }} />
      <Tab.Screen name='ConfigNav' component={ConfigNavigator} options={{ title: texts.Config }} />
    </Tab.Navigator>
  )
}


// Counters Navigator ////////////////////////////////////////////////////////////

const ScreenOptions = (theme: ThemeType) => (({ navigation }: {navigation: any}) => ({
  
  headerStyle: { height: sh(0.15) } as ViewStyle,
  headerTitleStyle: { fontSize: 30, textAlignVertical: 'bottom' } as TextStyle,
  headerTitleContainerStyle: { alignSelf: 'flex-end', paddingBottom: sh(0.01) } as ViewStyle,

  headerRightContainerStyle: { marginBottom: -sh(0.04) } as ViewStyle,

  headerBackTitle: '',

  headerRight: () => (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() => navigation.navigate('Settings')}
    >
      <SettingsIcon color={theme.color.secondaryText} size={25} />
    </TouchableOpacity>
  ),

  ...TransitionPresets.SlideFromRightIOS
} as StackNavigationOptions))

const CountersStack = createStackNavigator()

function CountersNavigator() {

  const [theme] = useTheme()
  const [texts] = useTexts('app')

  return (
    <CountersStack.Navigator
      initialRouteName='Counters'
      screenOptions={ScreenOptions(theme)}
    >
      <CountersStack.Screen name='Counters' component={CountersScreen} options={{ title: texts.Counters }} />
    </CountersStack.Navigator>
  )
}


// Config Navigator ////////////////////////////////////////////////////////////

const ConfigStack = createStackNavigator()

function ConfigNavigator() {

  const [theme] = useTheme()
  const [texts] = useTexts('app')

  return (
    <ConfigStack.Navigator
      initialRouteName='Config'
      screenOptions={ScreenOptions(theme)}
    >
      <ConfigStack.Screen name='Config' component={ConfigScreen} options={{ title: texts.Config }}/>
    </ConfigStack.Navigator>
  )
}
