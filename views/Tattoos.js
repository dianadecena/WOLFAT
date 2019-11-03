import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import db from '../config';
import Card from './components/Card';

var id, tattoos = [];
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Tattoos extends React.Component {

  _isMounted = false;

  state = {
    fontLoaded: false, tattoos, id
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this._isMounted = true;

    db.firestore().collection('Posts').where('tipo', '==', 1).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        tattoos.push(doc.data().image);
        this.setState({ tattoos })
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sleep = async () => {
    await sleep(10000)
  }

  render() {
    const items = []
    if (Array.isArray(tattoos) && tattoos.length) {
    for (const [index, image] of this.state.tattoos.entries()) {
      items.push(<Card key={index} imageUri={image}/>)
    }
  }

    return (
      <View style={styles.backgroundContainer}>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              tattoos
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

export default Tattoos;

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
  },
  card: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 260,
    height: 360,
    borderRadius: 20,
    marginLeft: 5,
    marginBottom: 160,
  }
});