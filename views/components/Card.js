import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import nolike from '../assets/no-like.png';
import like from '../assets/like.png';
import more from '../assets/more.png';

class Card extends React.Component {

  imageDetails(image){
    this.props.navigation.navigate('ImageDetails', {
      image: image,
    });
  }

  render() {
    return (
        <View style={styles.card}>
        <View onStartShouldSetResponder={() => this.imageDetails(this.props.imageUri)}>
        </View> 
        <Image source={{uri: this.props.imageUri.toString()}} style={styles.topCard}/>
        <View style={styles.bottomCard}>
        <View>
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
    width: 160,
    height: 240,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 0,
    shadowOpacity: 1.0,
    marginTop: 10,
  },
  bottomCard: {
    backgroundColor: '#330D5A',
    width: 160,
    height: 36,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, 
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 0,
    shadowOpacity: 1.0,
    marginTop: 0,
    opacity: .7
  },
  card: {
    padding: 6,
  }
});

