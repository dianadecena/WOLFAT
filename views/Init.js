import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import bgImage from './assets/background.png';
import tattoo from './assets/tattoo-machine.png';
import salon from './assets/salon.png';
import piercing from './assets/piercing.png';
import cosmetics from './assets/cosmetics.png';
import { Dimensions } from "react-native";
import logo from './assets/wolfat.png';
import * as Font from 'expo-font';
import Button from './components/Button';
import { withNavigation } from 'react-navigation';

var width = Dimensions.get('window').width;

class Init extends React.Component {

    static onArtistPress() {
        alert("HHHHHHH");
    }

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
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={{marginTop: 60, padding: 20}}> 
      { this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 100, color: '#141414' }}>
              wolfat
            </Text>
          ) : null }
      </View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#E7E7E7', fontSize: 20}}>ARE YOU AN ARTIST OR A CLIENTE?</Text>
      </View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
      <Button text="A R T I S T" background="black" color="white" handleOnPress={this.onArtistPress}/>
      <Button text="C L I E N T" background="white" color="black" />
      </View>
    </ImageBackground>
    );
  }
}

export default withNavigation(Init);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  }
});