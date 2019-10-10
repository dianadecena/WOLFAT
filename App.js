import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation'
import Home from './views/Home'
import Saved from './views/Saved'
import Inbox from './views/Inbox'
import Trips from './views/Trips'


export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/home.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Profile: {
    screen: Saved,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/profile.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Inbox: {
    screen: Trips,
    navigationOptions: {
      tabBarLabel: 'INBOX',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/message.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Notifications: {
    screen: Inbox,
    navigationOptions: {
      tabBarLabel: 'NOTIFICATIONS',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/notifications.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});