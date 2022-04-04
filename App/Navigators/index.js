import React from 'react'
import config from '@Config'
import { Text } from 'react-native'
import { Icon} from '@ant-design/react-native'
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation'

import HomeScreen from '@Views/Home'
import LoginScreen from '@Views/Login'
import AuthLoadingScreen from '@Views/AuthLoading'

import MallScreen from '@Views/Mall'
import ServiceScreen from '@Views/Service'
import ProgressScreen from '@Views/Progress'

import UserScreen from '@Views/User'
import SettingsScreen from '@Views/User/Settings'
import SystemScreen from '@Views/User/System'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
})

const UserStack = createStackNavigator({
  User: { screen: UserScreen },
})

const MallStack = createStackNavigator({
  Mall: { screen: MallScreen },
})

const ServiceStack = createStackNavigator({
  Service: { screen: ServiceScreen },
})

const ProgressStack = createStackNavigator({
  Progress: { screen: ProgressScreen },
})

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Mall: { screen: MallStack },
    // Service: { screen: ServiceStack },
    // Progress: { screen: ProgressStack },
    User: { screen: UserStack }
  },
  {
    navigationOptions: () => ({
      header: null,
      headerBackTitle: '返回',
      headerTruncatedBackTitle: '返回',
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        switch (routeName) {
          case 'Home':
            return (
              <Text
                style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}
              >
                首页
              </Text>
            )
          case 'User':
            return (
              <Text
                style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}
              >
                我的
              </Text>
            )
          case 'Mall':
            return (
              <Text
                style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}
              >
                商城
              </Text>
            )
        }
      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
          case 'Home':
            iconName = `home`
            break
          case 'User':
            iconName = `user`
            break
          case 'Mall':
            iconName = `appstore`
            break
          case 'Service':
            iconName = `message`
            break
          case 'Progress':
            iconName = `car`
            break
        }
        return (
          <Icon
            name={iconName}
            size="sm"
            color={tintColor}
          />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: config.mainColor,
      inactiveTintColor: 'gray',
    },
  },
)

const AppStack = createStackNavigator({
  Tabs: TabNavigator,
  Settings: { screen: SettingsScreen },
  System: { screen: SystemScreen },
})

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: { screen: AuthLoadingScreen },
      App: { screen: AppStack },
      Login: { screen: LoginScreen },
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
)
