import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CountersScreen, ConfigScreen } from '~/screens';
import { useTheme } from '~/hooks/useTheme';
import { StarIcon } from '~/components';


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
      notification: theme.color.primary
    }
  }

  return (
    <NavigationContainer theme={navigationTheme} >
      <Stack.Navigator initialRouteName='TabNav' headerMode='none' >
        <Stack.Screen name='TabNav' component={TabNavigator} />
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
      screenOptions={{
        tabBarIcon: ({ focused, color, size }) => <StarIcon size={size} color={color} />
      }}
    >
      <Tab.Screen name='CountersNav' component={CountersNavigator} options={{ title: 'Counters' }} />
      <Tab.Screen name='ConfigNav' component={ConfigNavigator} options={{ title: 'Config' }} />
    </Tab.Navigator>
  )
}


// Counters Navigator ////////////////////////////////////////////////////////////

const CountersStack = createStackNavigator()

function CountersNavigator() {
  return (
    <CountersStack.Navigator initialRouteName='Counters' >
      <CountersStack.Screen name='Counters' component={CountersScreen} />
    </CountersStack.Navigator>
  )
}


// Config Navigator ////////////////////////////////////////////////////////////

const ConfigStack = createStackNavigator()

function ConfigNavigator() {
  return (
    <ConfigStack.Navigator initialRouteName='Config' >
      <ConfigStack.Screen name='Config' component={ConfigScreen} />
    </ConfigStack.Navigator>
  )
}
