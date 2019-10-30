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
import Login from './views/Login'
import EditarPerfil from './views/EditarPerfil'
import FotoPerfil from './views/FotoPerfil'

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
  }
}, {
  tabBarOptions: {
    activeTintColor: '#8D3FDC',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'black',
      borderTopWidth: 0,
      borderRadius: 20,
      alignSelf: "stretch",
      position: 'absolute',
			left: 0,
			right: 0,
      bottom: 0,
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
  },
  Login:{
    screen: Login
  },
  EditarPerfil:{
    screen: EditarPerfil
  },
  Profile:{
    screen: Profile
  },
  FotoPerfil:{
    screen: FotoPerfil
  }
})

const AppContainer = createAppContainer(LoginSwitch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
});