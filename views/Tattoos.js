import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import Button from './components/Button';
import firebase from 'firebase';
import db from '../config';

var id, imagesUser = [];

class Tattoos extends React.Component {

  state = {
    fontLoaded: false, imagesUser, id
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  /*db.firestore().collection('Posts').get().then(snapshot => {
            snapshot.forEach(doc => {
              imagesUser = doc.data().image
              this.setState({ imagesUser })
              console.log(imagesUser)
            });
          }).catch(err => {
            console.log('Error getting documents', err);
          });*/

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);

        db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            imagesUser = doc.data().images
            this.setState({ imagesUser })
            console.log(imagesUser)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    const images = ['one', 'two'];
    console.log(images)
    const items = []
    console.log(this.state.imagesUser)
    for (const [index, image] of this.state.imagesUser.entries()) {
      items.push(<Image source={{ uri: image }} key={index} style={styles.card} />)
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
          <ScrollView decelerationRate={0.5}>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
              {items}

            </View>
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