import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation'
import Inbox from './Inbox'
import { StatusBar } from 'react-native';
import Card from './components/Card'

class Tattoos extends React.Component {

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Card imageUri={require('./assets/tattooer.jpg')}/>
        <Card imageUri={require('./assets/tattooer.jpg')}/>
        <Card imageUri={require('./assets/tattooer.jpg')}/>
        <Card imageUri={require('./assets/tattooer.jpg')}/>
        </ScrollView>
      </View>
    );
  }
}

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
      screen: Inbox,
      navigationOptions: {
        tabBarLabel: 'estética',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('./assets/salon.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
        )
      }
    },
    Piercing: {
      screen: Inbox,
      navigationOptions: {
        tabBarLabel: 'perforaciones',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('./assets/piercing.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
        )
      }
    },
    Maquillaje: {
      screen: Inbox,
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
      activeTintColor: '#330D5A',
      inactiveTintColor: 'black',
      indicatorStyle: {
          backgroundColor: '#330D5A',
      },
      labelStyle: {
        fontSize: 7,
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        marginTop: StatusBar.currentHeight
      }
    }
  })
  

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
  },
  topCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 260,
    height: 360,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 20,
  },
  bottomCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#330D5A',
    width: 260,
    height: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, 
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 5,
  },
  card: {
    marginLeft: 10,
  }
});

