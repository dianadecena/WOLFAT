import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, Alert, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import db from '../../config';
import moment from "moment";
import papelera from '../assets/delete.png';
import firebase from 'firebase'
import profile from '../Profile';

class CardProfile extends React.Component {

  _isMounted = false;

  state = {
    name: '',
    profileImage: null,
    loading: false,
    imageID: null,
  }

  componentDidMount() {
    this._isMounted = true;

    try {
      this.getUsernames();
    }
    catch (error) {
      console.log(error);
    }
  };

  imageDetails(image) {
    this.props.navigation.navigate('ImageDetails', {
      image: image,
    });
  }

  getUsernames() {
    this.setState({
      loading: true,
    });
    if (this.props.opcion === 'VER SUBIDAS') {
      var user = firebase.auth().currentUser;
      db.firestore().collection('Usuario').doc(user.uid).get()
        .then(doc => {
          if (this._isMounted) {
            this.setState({
              name: doc.data().displayName,
              profileImage: doc.data().profileImage,
              loading: false
            })
          }
        });
    } else if (this.props.opcion === 'VER GUARDADAS') {
      db.firestore().collection('Usuario').doc(this.props.uid).get()
        .then(doc => {
          if (this._isMounted) {
            this.setState({
              name: doc.data().displayName,
              profileImage: doc.data().profileImage,
              loading: false
            })
          }
        });
    }

  }
  catch(error) {
    console.log(error);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteImage(image, uid) {


    const usuario = db.firestore().collection('Usuario').doc(uid);
    usuario.update({
      images: firebase.firestore.FieldValue.arrayRemove(image)
    });
    const postsRef = db.firestore().collection("Posts");

    postsRef.get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        if (doc.data().image === this.props.imageUri) {
          var ID = doc.id;
          this.setState({ imageID: ID })
          this.deleteID();
        }
      });
    }).then(() => this.props.delete(this.props.index));
  }

  deleteID() {
    const postsRef = db.firestore().collection("Posts");
    postsRef.doc(this.state.imageID).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deleteAlert() {
    Alert.alert(
      'Borrar Imagen',
      '¿Seguro que desea eliminar la foto?',
      [
        { text: 'SI', onPress: () => this.deleteImage(this.props.imageUri, this.props.uid) },
        { text: 'NO', style: 'cancel' }
      ]
    )
  }

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.card}>
          <View onStartShouldSetResponder={() => this.imageDetails(this.props.imageUri)}>
          </View>
          <Image source={{ uri: this.props.imageUri.toString() }} style={styles.topCard} />
          <View style={styles.bottomCard}>
            <Image source={{ uri: this.state.profileImage }} style={{
              borderRadius: 15, width: 30, height: 30,
              marginLeft: 10, marginTop: 5
            }} />
            <Text style={{ color: 'white', marginLeft: 47, marginTop: -25 }}>{this.state.name}</Text>
            <View onStartShouldSetResponder={() => this.deleteAlert()}>
                <Image onPress={() => this.deleteAlert()} source={papelera} style={{ width: 26, height: 26, marginLeft: 265, marginTop: -25 }} />
            </View>
          </View>
        </View>
      );
    } else {
      return null
    }
  }
}

export default withNavigation(CardProfile);

const styles = StyleSheet.create({
  topCard: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 300,
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
    width: 300,
    height: 40,
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