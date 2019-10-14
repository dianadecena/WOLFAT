import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './views/Home';
import Tattoos from './views/Tattoos';
import Profile from './views/Profile';
import Loading from './views/Loading';
import SubirImagen from './views/SubirImagen';
import Init from './views/Init';

import {createSwitchNavigator} from 'react-navigation';
import firebase from 'firebase';
import {firebaseConfig} from './config';
import Dashboard from './views/Dashboard';
firebase.initializeApp(firebaseConfig)

class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}
export default App;


const BottomTab = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'DASHBOARD',
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
      tabBarLabel: 'INBOX',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/paper-plane.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Notifications: {
    screen: Tattoos,
    navigationOptions: {
      tabBarLabel: 'NOTIFICATIONS',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/notification.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
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

const StackNavigator  = createStackNavigator({BottomTab}, {headerMode: "none"});

const LoginSwitch = createSwitchNavigator({
  Loading:{
    screen: Loading
  },
  Home:{
    screen: Home
  },
  Dashboard:{
    screen: StackNavigator
  }
})

const AppContainer = createAppContainer(LoginSwitch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});