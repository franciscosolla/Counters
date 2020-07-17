import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar';

import { CountersScreen, ConfigScreen, SettingsScreen, PickerScreen } from '~/screens';
import { useTheme, ThemeType } from '~/hooks';
import { StarIcon, SettingsIcon, ListIcon, TimerIcon } from '~/components';



// Root Navigator ////////////////////////////////////////////////////////////

const Stack = createStackNavigator()

export default function App() {

  const [theme] = useTheme()

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
        <Stack.Screen name='Settings' component={SettingsScreen} options={{ ...TransitionPresets.ModalPresentationIOS }} />
        <Stack.Screen name='Picker' component={PickerScreen} options={{ ...TransitionPresets.ModalPresentationIOS }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// Tab Navigator ////////////////////////////////////////////////////////////

const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='CountersNav'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          route.name === 'CountersNav' ?
            <ListIcon size={size} color={color} /> 
          : 
            <TimerIcon size={size} color={color} />  
        )
      })}
    >
      <Tab.Screen name='CountersNav' component={CountersNavigator} options={{ title: 'Counters' }} />
      <Tab.Screen name='ConfigNav' component={ConfigNavigator} options={{ title: 'Config' }} />
    </Tab.Navigator>
  )
}


// Counters Navigator ////////////////////////////////////////////////////////////

const ScreenOptions = (theme: ThemeType) => (({ navigation }: {navigation: any}) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() => navigation.navigate('Settings')}
    >
      <SettingsIcon color={theme.color.secondaryText} />
    </TouchableOpacity>
  ),
  ...TransitionPresets.SlideFromRightIOS
} as StackNavigationOptions))

const CountersStack = createStackNavigator()

function CountersNavigator() {

  const [theme] = useTheme()

  return (
    <CountersStack.Navigator
      initialRouteName='Counters'
      screenOptions={ScreenOptions(theme)}
    >
      <CountersStack.Screen name='Counters' component={CountersScreen} />
    </CountersStack.Navigator>
  )
}


// Config Navigator ////////////////////////////////////////////////////////////

const ConfigStack = createStackNavigator()

function ConfigNavigator() {

  const [theme] = useTheme()

  return (
    <ConfigStack.Navigator
      initialRouteName='Config'
      screenOptions={ScreenOptions(theme)}
    >
      <ConfigStack.Screen name='Config' component={ConfigScreen} />
    </ConfigStack.Navigator>
  )
}
