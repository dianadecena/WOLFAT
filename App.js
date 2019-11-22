import React from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';

import { createBottomTabNavigator, createAppContainer, createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
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
import LikedImages from "./views/LikedImages";
import SavedImages from "./views/SavedImages";
import Settings from "./views/Settings";


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createSwitchNavigator } from 'react-navigation';

import Dashboard from './views/Dashboard';
import { Icon, Container, Header, Content, Left } from 'native-base'

import ignoreWarnings from 'react-native-ignore-warnings';
import { View } from 'native-base';
ignoreWarnings('Setting a timer');

class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
export default App;

const DrawerNav = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard//StackNavigator
  },
  ImageDetails: {
    screen: ImageDetails
  },
  ViewProfile: {
    screen: ViewProfile
  },
},
  { headerMode: "none" })

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: '#000000'
        },
        headerLeft: (
          <View onStartShouldSetResponder={() => navigation.openDrawer()}>
            <Icon style={{ marginLeft: 15, color: '#ffffff' }} onPress={() => navigation.openDrawer()} name="md-menu" size={35} />
          </View>
        )
      };
    }
  },
  SubirImagen: {
    screen: SubirImagen,

    navigationOptions: {
      header: null
    }
  },
  EditarPerfil: {
    screen: EditarPerfil,
    navigationOptions: {
      header: null
    }
  },
  FotoPerfil: {
    screen: FotoPerfil,
    navigationOptions: {
      header: null
    }
  },
  VerGuardadas: {
    screen: SavedImages,
    navigationOptions: {
      title: 'Imagenes Guardadas',
      headerTitleStyle: {
        fontSize: hp('2.5%')
      },
    }
  },
  VerLikes: {
    screen: LikedImages,
    navigationOptions: {
      title: 'Imagenes Que Te Gustaron',
      headerTitleStyle: {
        fontSize: hp('2.5%')
      },
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Configuración',
      headerTitleStyle: {
        fontSize: hp('2.5%')
      },
    }
  }
});

const ProfileDrawerNavigation = createDrawerNavigator({
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="person" size={30} style={{ color: tintColor }} />
      )
    }
    /*navigationOptions: {
      drawerLabel: () => null
    }*/
  },
  VerGuardadas: {
    screen: SavedImages,
    navigationOptions: {
      drawerLabel: 'Imagenes Guardadas',
      drawerIcon: ({ tintColor }) => (
        <Icon name="bookmark" size={30} style={{ color: tintColor }} />
      )
    }
  },
  VerLikes: {
    screen: LikedImages,
    navigationOptions: {
      drawerLabel: 'Imagenes Que Te Gustaron',
      drawerIcon: ({ tintColor }) => (
        <Icon name="heart" size={30} style={{ color: tintColor }} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: 'Configuración',
      drawerIcon: ({ tintColor }) => (
        <Icon name="settings" size={30} style={{ color: tintColor }} />
      )
    }
  }
}, {
  contentComponent: DrawerNav,
  contentOptions: {
    activeTintColor: '#ccff00',
    inactiveTintColor: '#ffffff',
  },
  style: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#000000',
    tintColor: '#ffffff',
  }
})

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
    screen: ProfileDrawerNavigation,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/skull.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  }
}, 
  {
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
