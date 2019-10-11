import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.card}>
        <View style={styles.topCard}>
        </View>
        <View style={styles.bottomCard}>
        </View>
        </View>
    );
  }
}

export default Card;

const styles = StyleSheet.create({
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

