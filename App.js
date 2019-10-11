import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Home from './views/Home'
import Tattoos from './views/Tattoos'
import Inbox from './views/Inbox'
import Trips from './views/Trips'
import Loading from './views/Loading'
import Login from './views/Login'

import {createSwitchNavigator} from 'react-navigation'
import firebase from 'firebase'
import {firebaseConfig} from './config'
firebase.initializeApp(firebaseConfig)


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
    screen: Tattoos,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/skull.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Inbox: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: 'Login',
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
}, {
  tabBarOptions: {
    activeTintColor: '#330D5A',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'black',
      borderTopWidth: 0,
      shadowOffset: { width: 5, height: 3 },
      shadowColor: 'white',
      shadowOpacity: 0.5,
      elevation: 5
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