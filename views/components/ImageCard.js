import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

class Card extends React.Component {

  render() {
    return (
        <View style={styles.card}>
        <Image source={this.props.imageUri} style={styles.topCard}/>
        <View style={styles.bottomCard}>
        </View>
        </View>
    );
  }
}

export default Card;

const styles = StyleSheet.create({
  topCard: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 260,
    height: 360,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 30,
  },
  card: {
    marginLeft: 10,
  }
});

