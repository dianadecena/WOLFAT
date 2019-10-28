import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button, FlatList} from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';

const imagesUser = [];

class Profile extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.uid);
        var usuario = db.firestore().collection('Usuario').doc(user.uid)
        var data = usuario.select('images').get()
        var posts = data.images
          posts.forEach(function(response) {
            console.log(response.data())
            imagesUser.push(response.data())
          })
      } else {
        // No user is signed in.
      }
    });
  }

  uploadImage(){
    this.props.navigation.navigate('SubirImagen');
  }

  render() {
    var loop = [];
    for (let i = 0; i < imagesUser.length; i++) {
      loop.push(
        <FlatList
          horizontal={false}
          numColumns={2}>
        <Image source={{ uri: image }} style={styles.card} />
        </FlatList>
      );
    }

    return (
      <ScrollView style={styles.backgroundContainer} decelerationRate={0.5}>
        <View>
        <Image source={require('./assets/header.jpg')} style={{height: 200}}/>
        <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('./assets/profile.jpg')} style={{borderRadius: 50, width: 100, height: 100}}/>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', marginTop: 10}}> 
        <Text style={{color:'white'}}>Nombre Apellido</Text>
        <Text style={{color:'white'}}>Caracas, Venezuela</Text>
        <Text style={{color:'white'}}>Descripción</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', height: 40}}>
        <View style={{width: 150}}>
        <Button title="EDITAR PERFIL" color="#330D5A"></Button>
        </View>
        <View style={{width: 40, height: 40, borderRadius: 50, 
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
        onStartShouldSetResponder={() => this.uploadImage()}
        >
        <Image style={{resizeMode: 'cover'}} 
        source={require('./assets/camera.png')}/>
        </View>

        </View>

        <View style={{alignItems:'center', justifyContent:'center', marginTop:40}}>
        {loop}
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
    marginBottom:160,
  }
});

