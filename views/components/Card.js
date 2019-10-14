import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class Card extends React.Component {

  imageDetails(){
    this.props.navigation.navigate('ImageDetails');
  }

  render() {
    return (
        <View onStartShouldSetResponder={() => this.imageDetails()} style={styles.card}>
        <Image source={this.props.imageUri} style={styles.topCard}/>
        <View style={styles.bottomCard}>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  card: {
    marginLeft: 10,
  }
});

