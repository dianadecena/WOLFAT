import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation'
import Estetica from './Estetica'
import Makeup from './Makeup'
import Tattoos from './Tattoos'
import Piercings from './Piercings'
import { StatusBar } from 'react-native';

export default createMaterialTopTabNavigator({
    Tatuajes: {
      screen: Tattoos,
      navigationOptions: {
        tabBarLabel: 'tatuajes',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('./assets/tattoo-machine.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
        )
      }
    },
    Salon: {
      screen: Estetica,
      navigationOptions: {
        tabBarLabel: 'estética',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('./assets/salon.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
        )
      }
    },
    Piercings: {
      screen: Piercings,
      navigationOptions: {
        tabBarLabel: 'perforaciones',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('./assets/piercing.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
        )
      }
    },
    Maquillaje: {
      screen: Makeup,
      navigationOptions: {
        tabBarLabel: 'maquillaje',
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
        height: 55,
        backgroundColor: '#151515',
        blurRadius: 1,
        borderTopWidth: 0,
        marginTop: StatusBar.currentHeight,
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