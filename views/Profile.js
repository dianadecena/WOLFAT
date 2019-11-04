import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';
import Button from './components/Button';
import header from './assets/header.jpg';


var nombre, apellido, ubicacion, descripcion, fotoPerfil, imagesUser = [], username;

class Profile extends React.Component {
  state = {
    nombre,
    apellido,
    ubicacion,
    descripcion,
    imagesUser,
    fotoPerfil,
    username
  }


  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);

        db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            nombre = doc.data().Nombre
            apellido = doc.data().Apellido
            ubicacion = doc.data().Ubicacion
            descripcion = doc.data().Descripcion
            imagesUser = doc.data().images
            fotoPerfil = doc.data().profileImage
            username = doc.data().displayName
            this.setState({ nombre })
            this.setState({ apellido })
            this.setState({ ubicacion })
            this.setState({ descripcion })
            this.setState({ imagesUser })
            this.setState({ fotoPerfil })
            this.setState({ username })
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

  toUpdate = async () => {
    this.props.navigation.navigate('EditarPerfil');
  }

  toProfile = async () => {

    this.props.navigation.navigate('Dashboard');
  }

  changeProfilePic() {
    this.props.navigation.navigate('FotoPerfil');
  }

  render() {

    const items = []
    if (Array.isArray(imagesUser) && imagesUser.length) {
    for (const [index, image] of this.state.imagesUser.entries()) {
      items.push(<Image source={{ uri: image }} key={index} style={styles.card} />)
    }
  }

    return (
      <ScrollView style={styles.backgroundContainer} decelerationRate={'fast'}>
        <View>
          <Image source={header} style={{ height: 200 }} />
          <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center' }} 
          onStartShouldSetResponder={() => this.changeProfilePic()}>
          <Image source={{ uri: fotoPerfil }} style={{ borderRadius: 50, width: 100, height: 100}} />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: 'white' }}>@{this.state.username}</Text>
            <Text style={{ color: 'white' }}>{this.state.nombre} {this.state.apellido}</Text>
            <Text style={{ color: 'white' }}>{this.state.ubicacion}</Text>
            <Text style={{ color: 'white' }}>{this.state.descripcion}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent:'space-between' , height: 40}}>
            <View style={{
              width: 40, height: 40, borderRadius: 50, marginTop: 10, marginLeft: 20,
              backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
            }}
            onStartShouldSetResponder={() => this.toProfile()}
            >
                   <Image style={{ resizeMode: 'cover' }}
                source={require('./assets/camera.png')} />
            </View>
            <View style={{
              width: 40, height: 40, borderRadius: 50, marginTop: 10, marginRight: 20,
              backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'
            }}
              onStartShouldSetResponder={() => this.uploadImage()}
            >
              <Image style={{ resizeMode: 'cover' }}
                source={require('./assets/camera.png')} />
            </View>
          </View>
          <View style={{ width: 215,  marginTop: -45, marginLeft: 63, marginRight: 180}}>
              <Button text="Edit profile" background="white" color="#330D5A" onPress={this.toUpdate}/>
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
    marginBottom: 25,
  }
});
