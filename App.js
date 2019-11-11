import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Profile from './views/Profile';
import Loading from './views/Loading';
import Init from './views/Init';
import SubirImagen from './views/SubirImagen';
import ImageDetails from './views/ImageDetails';
import ViewProfile from './views/ViewProfile';
import SignUp from './views/SignUp'
import Login from './views/Login'
import EditarPerfil from './views/EditarPerfil'
import FotoPerfil from './views/FotoPerfil'

import { createSwitchNavigator } from 'react-navigation';

import Dashboard from './views/Dashboard';

import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
export default App;

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard//StackNavigator
  },
  ViewProfile: {
    screen: ViewProfile
  },
},
{ headerMode: "none" })

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile
  },
  SubirImagen: {
    screen: SubirImagen
  },
  EditarPerfil: {
    screen: EditarPerfil
  },
  FotoPerfil: {
    screen: FotoPerfil
  }
},
{ headerMode: "none" })

const BottomTab = createBottomTabNavigator({
  DashboardStack: {
    screen: DashboardStack,
    navigationOptions: {
      tabBarLabel: 'DASHBOARD',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/home.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  ProfileStack: {
    screen: ProfileStack,
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
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignSelf: "stretch",
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    }
  }
})

const StackNavigator = createStackNavigator({ BottomTab }, { headerMode: "none" });

const LoginStack = createStackNavigator({
  Loading: {
    screen: Loading
  },
  Init: {
    screen: Init
  },
  SignUp: {
    screen: SignUp
  },
  Login: {
    screen: Login
  }
},
{ headerMode: "none" })

const AppStack = createStackNavigator({
  screen: BottomTab
},
{ headerMode: "none" })

const AppSwitch = createSwitchNavigator({
  Login: {
    screen: LoginStack
  },
  App: {
    screen: AppStack
  }


})

const AppContainer = createAppContainer(AppSwitch);
