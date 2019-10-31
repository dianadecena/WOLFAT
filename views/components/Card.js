import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import add from '../assets/plus.png'

class Card extends React.Component {

  imageDetails(image){
    this.props.navigation.navigate('ImageDetails', {
      image: image,
    });
  }

  render() {
    return (
        <View style={styles.card}>
        <Image source={{uri: this.props.imageUri.toString()}} style={styles.topCard}/>
        <View style={styles.bottomCard}>
        <View onStartShouldSetResponder={() => this.imageDetails(this.props.imageUri)}>
        <Image source={add} style={{width:24, height:24, marginLeft:220, marginTop:5}}/>
        </View>  
        </View>
        </View>
    );
  }
}

export default withNavigation(Card);

const styles = StyleSheet.create({
  topCard: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 260,
    height: 334,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 10,
  },
  bottomCard: {
    backgroundColor: '#330D5A',
    width: 260,
    height: 36,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, 
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 5,
    opacity: .7
  },
  card: {
    marginLeft: 10,
  }
});

