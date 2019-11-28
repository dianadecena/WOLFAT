import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import Estetica from './Estetica'
import Makeup from './Makeup'
import Tattoos from './Tattoos'
import Piercings from './Piercings'
import { StatusBar } from 'react-native';

const TopNav = createMaterialTopTabNavigator({
  Tatuajes: {
    screen: Tattoos,
    navigationOptions: {
      tabBarLabel: 'Tattoo',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/tattoo-machine.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Salon: {
    screen: Estetica,
    navigationOptions: {
      tabBarLabel: 'Hair',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/salon.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Piercings: {
    screen: Piercings,
    navigationOptions: {
      tabBarLabel: 'Piercings',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/piercing.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  },
  Maquillaje: {
    screen: Makeup,
    navigationOptions: {
      tabBarLabel: 'Makeup',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/cosmetics.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
    }
  }
}, {
  tabBarOptions: {
    showIcon: true,
    scrollEnabled: false,
    activeTintColor: '#ccff00',
    inactiveTintColor: 'white',
    indicatorStyle: {
      backgroundColor: '#ccff00',
    },
    labelStyle: {
      fontSize: 7,
    },
    style: {
      height: 60,
      backgroundColor: '#151515',
      blurRadius: 1,
      borderTopWidth: 0,
      marginTop: StatusBar.currentHeight
    }
  }
})

const AppContainer = createAppContainer(TopNav)
export default AppContainer;
