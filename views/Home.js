import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import bgImage from './assets/background.png';
import tattoo from './assets/tattoo-machine.png';
import salon from './assets/salon.png';
import piercing from './assets/piercing.png';
import cosmetics from './assets/cosmetics.png';
import { Dimensions } from "react-native";

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
        borderBottomRightRadius: 55, backgroundColor: '#141414', alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text style={{ fontSize: 40, color: 'white'
      }}>WOLFAT</Text>
      </View>
      <View style={{
        flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center',
        marginTop: 10, marginLeft: 75
      }}>
        <View style={styles.cardOption}>
          <Image source={tattoo} style={{ width: 80, height: 80, marginTop: 5 }} />
        </View>
        <View style={styles.cardOption}>
          <Image source={salon} style={{ width: 65, height: 65, marginTop: 10 }} />
        </View>
        <View style={styles.cardOption}>
          <Image source={piercing} style={{ width: 65, height: 65, marginTop: 10 }} />
        </View>
        <View style={styles.cardOption}>
          <Image source={cosmetics} style={{ width: 65, height: 65, marginTop: 10 }} />
        </View>
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

