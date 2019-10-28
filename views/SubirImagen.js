import * as React from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase'
import db from '../config';
//var storage = firebase.app().storage("gs://wolfat-9ca6f.appspot.com");

class SubirImagen extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <Button
          title="Pick an image from camera roll"
          onPress={this.chooseImage}
        />
      {image && <Image source={{ uri: image }} style={styles.card} />}
      <Button
          title="UPLOAD"
          color="black"
          onPress={() => this.uploadImage(image)}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

   chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let filename = uri.split('/').pop();
    var storageRef = db.storage().ref().child('images/' + filename);
    storageRef.put(blob).then(function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }).then(function() {
        // Upload completed successfully, now we can get the download URL
        storageRef.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                var usuarios = db.firestore().collection('Usuario').doc(user.uid);
                console.log(user.uid);
                usuarios.update({
                  images: firebase.firestore.FieldValue.arrayUnion(downloadURL)
              });
              db.firestore().collection('Posts').add({
                image: downloadURL,
                uid: user.uid
            });
              } else {
                // No user is signed in.
              }
            });
        });
    });
  
  }
};

export default withNavigation(SubirImagen);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
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
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 30,
  }
});
