import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import bgImage from './assets/background.png';
import tattoo from './assets/tattoo-machine.png';
import salon from './assets/salon.png';
import piercing from './assets/piercing.png';
import cosmetics from './assets/cosmetics.png';
import { Dimensions } from "react-native";
import logo from './assets/wolfat.png'

var width = Dimensions.get('window').width;

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={{
        width: width, height: 200, borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55, backgroundColor: 'black', alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Image source={logo} />
      </View>
    </ImageBackground>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  cardOption: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 100,
    height: 100,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 5,
  }
});

