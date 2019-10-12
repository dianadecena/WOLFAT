import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation'
import Inbox from './Inbox'
import { StatusBar } from 'react-native';
import Card from './components/Card'

class Estetica extends React.Component {

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Card imageUri={require('./assets/haircut.jpg')}/>
        <Card imageUri={require('./assets/haircut.jpg')}/>
        <Card imageUri={require('./assets/haircut.jpg')}/>
        <Card imageUri={require('./assets/haircut.jpg')}/>
        </ScrollView>
      </View>
    );
  }
}

export default Estetica;

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

