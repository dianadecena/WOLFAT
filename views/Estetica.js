import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import db from '../config';
import Card from './components/Card';

var id, estetica = [];

class Estetica extends React.Component {

  state = {
    fontLoaded: false, id, estetica
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    db.firestore().collection('Posts').where('tipo', '==', 2).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          estetica.push(doc.data().image);
          this.setState({ estetica })
        });
      });
  }

  render() {
    const items = []
    if (Array.isArray(estetica) && estetica.length) {
      for (const [index, image] of this.state.estetica.entries()) {
        items.push(<Card key={index} imageUri={image} />)
      }
    }

    return (
      <View style={styles.backgroundContainer}>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              hair
      </Text>) : null}
        </View>
        <View style={styles.cardContainer}>
          <ScrollView decelerationRate={'fast'}>
              {items}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Estetica;

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

