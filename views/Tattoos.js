import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Card from './components/Card'

class Tattoos extends React.Component {

  state = {
    fontLoaded: false,
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
      <View style={{marginTop: 3, marginLeft: 20}}> 
      { this.state.fontLoaded ? (
      <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
        tattoos 
      </Text>) : null }
      </View>
      <View style={styles.cardContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} decelerationRate={0.5}>
        <Card imageUri={require('./assets/tattoo1.jpg')}/>
        <Card imageUri={require('./assets/tattoo1.jpg')}/>
        <Card imageUri={require('./assets/tattoo1.jpg')}/>
        <Card imageUri={require('./assets/tattoo1.jpg')}/>
        </ScrollView>
      </View>
      </View>
    );
  }
}

export default Tattoos;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

