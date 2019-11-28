import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, ActivityIndicator, RefreshControl, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';
import header from './assets/wolfat2.jpg';
import CardProfile from './components/CardProfile';
var nombre, apellido, ubicacion, descripcion, fotoPerfil, imagesUser = [], savedImages = [], items = [], username, result, uid, timestamp;

class Profile extends React.Component {
  state = {
    nombre,
    apellido,
    ubicacion,
    descripcion,
    imagesUser,
    savedImages,
    fotoPerfil,
    opcion: 'VER GUARDADAS',
    username,
    result,
    uid,
    timestamp,
    loading: false,
    items
  }


  _isMounted = false;

  componentDidMount = () => {
    try {
      this.retrieveData();
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo cargar la data.')
    }
  };

  retrieveData = async () => {
    try {
      this.setState({
        loading: true,
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {

          db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
              nombre = doc.data().Nombre
              apellido = doc.data().Apellido
              ubicacion = doc.data().Ubicacion
              descripcion = doc.data().Descripcion
              imagesUser = doc.data().images
              fotoPerfil = doc.data().profileImage
              username = doc.data().displayName
              uid = doc.data().uid
              this.setState({ nombre })
              this.setState({ apellido })
              this.setState({ ubicacion })
              this.setState({ descripcion })
              if (imagesUser != null) {
                var new_images = imagesUser.reverse()
                this.setState({ imagesUser: new_images })
              }
              if (fotoPerfil == null) {
                fotoPerfil = 'https://firebasestorage.googleapis.com/v0/b/wolfat-final.appspot.com/o/profile.jpg?alt=media&token=7f35015c-d7af-44d8-811d-bf794e1ff3c9'
                this.setState({ fotoPerfil })
              } else {
                fotoPerfil = doc.data().profileImage
                this.setState({ fotoPerfil })
              }
              this.setState({ username })
              this.setState({ uid })
              this.setState({ opcion: 'VER GUARDADAS' })
              this.setState({ loading: false })
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
    catch (error) {
      console.log(error);
    }
  }

  uploadImage() {
    this.props.navigation.navigate('SubirImagen', {
      insertImage: this.insertImage,
      deleteImage: this.deleteImage,
      index: this.state.items.length
    });
  }

  changeProfilePic() {
    this.props.navigation.navigate('FotoPerfil');
  }

  deleteImage = (index) => {
    this.state.imagesUser.splice(index, 1);
    this.setState({});
  }

  insertImage = (image) => {
    this.state.imagesUser.splice(0, 0, image)
    this.setState({});
  }

  render() {
    this.state.items = []
    if (Array.isArray(imagesUser) && imagesUser.length && !this.state.loading) {
      for (const [index, image] of this.state.imagesUser.entries()) {
        this.state.items.push(<CardProfile imageUri={image} uid={this.state.uid} opcion={this.state.opcion} key={index} index={index} delete={this.deleteImage} />)
      }
    }

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    /*if (this.state.imagesUser == null) {
      return (
        <View style={styles.container}>
          <Text>NO POSTS YET</Text>
        </View>
      );
    }*/

    return (
      <ScrollView style={styles.backgroundContainer} decelerationRate={'fast'}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.retrieveData}
          />
        }>
        <View>
          <Image source={header} style={{ height: 200 }} />
          <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableHighlight onPress={() => this.changeProfilePic()}>
              <Image source={{ uri: fotoPerfil }} style={{ borderRadius: 50, width: 100, height: 100 }} />
            </TouchableHighlight>

          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: 'white' }}>@{this.state.username}</Text>
            <Text style={{ color: 'white' }}>{this.state.nombre} {this.state.apellido}</Text>
            <Text style={{ color: 'white' }}>{this.state.ubicacion}</Text>
            <Text style={{ color: 'white' }}>{this.state.descripcion}</Text>
          </View>
          <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center', height: 40 }}>

            <View style={{
              width: 40, height: 40, borderRadius: 50, marginTop: 10,
              backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'
            }}>
              <TouchableHighlight onPress={() => this.uploadImage()}>
                <Image style={{ resizeMode: 'cover' }}
                  source={require('./assets/camera.png')} />
              </TouchableHighlight>

            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            {this.state.items}
          </View>

        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414'
  },
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
  },
  bottomCard: {
    backgroundColor: '#330D5A',
    width: 160,
    height: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 0,
    shadowOpacity: 1.0,
    marginTop: 0,
    opacity: .7
  }
});