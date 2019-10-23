import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './views/Home';
import Profile from './views/Profile';
import Loading from './views/Loading';
import Init from './views/Init';
import SubirImagen from './views/SubirImagen';
import ImageDetails from './views/ImageDetails';
import SignUp from './views/SignUp'

import {createSwitchNavigator} from 'react-navigation';
import firebase from 'firebase';
import {firebaseConfig} from './config';
import Dashboard from './views/Dashboard';

import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

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
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'INBOX',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/paper-plane.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Notifications: {
    screen: Dashboard,
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
  Init:{
    screen: Init
  },
  Loading:{
    screen: Loading
  },
  Home:{
    screen: Home
  },
  Dashboard:{
    screen: StackNavigator
  },
  ImageDetails:{
    screen: ImageDetails
  },
  SubirImagen:{
    screen: SubirImagen
  },
  SignUp:{
    screen: SignUp
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