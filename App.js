import React from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, StatusBar} from 'react-native';

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
import LikeImage from "./views/assets/like.png"


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createSwitchNavigator } from 'react-navigation';

import Dashboard from './views/Dashboard';
import Icon from '@expo/vector-icons/Ionicons';

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
        headerLeft: (
          <View onStartShouldSetResponder={() => navigation.openDrawer()}>
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
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
  },
  VerLikes: {
    screen: LikedImages
  },
  CerrarSesion: {
    screen: Init
  }
});

const ProfileDrawerNavigation = createDrawerNavigator({
  Profile: {
    screen: ProfileStack,
    /*navigationOptions: {
      drawerLabel: () => null
    }*/
  },
  VerGuardadas: {
    screen: SavedImages,
    navigationOptions : {
      drawerIcon: ({tintColor}) => (
       <Icon name="bookmark" style={{fontSize:24, color: tintColor}}/>
      )
    }
  },
  VerLikes: {
    screen: LikedImages
  },
  CerrarSesion: {
    screen: Init
  }
}, {
  contentComponent: DrawerNav,
  contentOptions: {
    activeTintColor: '#ccff00'
  },
  style: {
    marginTop: StatusBar.currentHeight
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
