import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import Home from './views/Home'
import Tattoos from './views/Tattoos'
import Profile from './views/Profile'
import Inbox from './views/Inbox'
import Trips from './views/Trips'
import Loading from './views/Loading'
import Login from './views/Login'
import SubirImagen from './views/SubirImagen'
import Init from './views/Init'

import {createSwitchNavigator} from 'react-navigation'
import firebase from 'firebase'
import {firebaseConfig} from './config'
import Dashboard from './views/Dashboard';
firebase.initializeApp(firebaseConfig)


const BottomTab = createBottomTabNavigator({
  Home: {
    screen: Init,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/home.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/skull.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Inbox: {
    screen: SubirImagen,
    navigationOptions: {
      tabBarLabel: 'Login',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/message.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Notifications: {
    screen: Tattoos,
    navigationOptions: {
      tabBarLabel: 'NOTIFICATIONS',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/notifications.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#8D3FDC',
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

export default createStackNavigator({BottomTab}, {headerMode: "none"});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});