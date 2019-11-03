import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import db from '../config';
import Card from './components/Card'

var id, piercing = [];

class Piercings extends React.Component {

  state = {
    fontLoaded: false, piercing, id
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this._isMounted = true;

    db.firestore().collection('Posts').where('tipo', '==', 3).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          piercing.push(doc.data().image);
          this.setState({ piercing })
        });
      });
  }

  render() {
    const items = []
    if (Array.isArray(piercing) && piercing.length) {
      for (const [index, image] of this.state.piercing.entries()) {
        items.push(<Card key={index} imageUri={image} />)
      }
    }
    return (
      <View style={styles.backgroundContainer}>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              piercings
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

export default Piercings;

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

