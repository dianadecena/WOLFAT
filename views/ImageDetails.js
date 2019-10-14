import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import tattoo from './assets/tattoo1.jpg';
import close from './assets/close.png';
import like from './assets/like.png'
import { withNavigation } from 'react-navigation';

class ImageDetails extends React.Component {

    closeImage(){
        this.props.navigation.navigate('Dashboard');
    }

  render() {
    return (
      <ImageBackground source={tattoo} style={styles.backgroundContainer}>
          <View style={{marginLeft: 300}} onStartShouldSetResponder={() => this.closeImage()}>
              <Image source={close} style={{width: 24, height: 24}}></Image>
          </View>
          <View style={styles.card}>
        <View style={{flex:1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
        <View style={{marginLeft:5}}>
        <Text style={{color:'white', fontSize:22}}>Nombre</Text>
        </View>
        <View style={{marginRight:5}}>
        <Image source={like}></Image>
        </View>
        </View>
          </View>
      </ImageBackground>
    );
  }
}

export default withNavigation(ImageDetails);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: 100,
    backgroundColor: 'black',
    opacity: .6,
    borderRadius: 20,
    width: 280,
    height: 350
  }
});