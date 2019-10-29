import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';

var nombre, ubicacion, descripcion, imagesUser = [];

class Profile extends React.Component {

  _isMounted = false;

  state = {
    nombre,
    ubicacion,
    descripcion,
    imagesUser
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);

        db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            nombre = doc.data().Nombre
            ubicacion = doc.data().Ubicacion
            descripcion = doc.data().Descripcion
            imagesUser = doc.data().images
            this.setState({ nombre })
            this.setState({ ubicacion })
            this.setState({ descripcion })
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

  uploadImage() {
    this.props.navigation.navigate('SubirImagen');
  }

  updateInfo() {
    this.props.navigation.navigate('EditarPerfil');
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
      <ScrollView style={styles.backgroundContainer} decelerationRate={0.5}>
        <View>
          <Image source={require('./assets/header.jpg')} style={{ height: 200 }} />
          <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/profile.jpg')} style={{ borderRadius: 50, width: 100, height: 100 }} />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: 'white' }}>{this.state.nombre}</Text>
            <Text style={{ color: 'white' }}>{this.state.ubicacion}</Text>
            <Text style={{ color: 'white' }}>{this.state.descripcion}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', height: 40 }}>
            <View style={{ width: 150 }}>
              <Button title="EDITAR PERFIL" color="#330D5A" onPress={this.updateInfo()}></Button>
            </View>
            <View style={{
              width: 40, height: 40, borderRadius: 50,
              backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'
            }}
              onStartShouldSetResponder={() => this.uploadImage()}
            >
              <Image style={{ resizeMode: 'cover' }}
                source={require('./assets/camera.png')} />
            </View>

          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            {items}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#141414',
    width: null,
    height: null,
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

