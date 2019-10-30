import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase'
import db from '../config';
import back from './assets/back.png';
import Button from './components/Button';

//var storage = firebase.app().storage("gs://wolfat-9ca6f.appspot.com");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class FotoPerfil extends React.Component {

  state = {
    image: null,
  };  

  toProfile = async () => {
    await sleep(2000)
    this.props.navigation.navigate('Profile');
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <Button
          text="Pick an image from camera roll" background="#330D5A" color="white" onPress={this.chooseImage}
        />
        {image && <Image source={{ uri: image }} style={styles.card} />}
        <View style={{marginTop: 40}}>
        <Button
          text="Upload" background="#330D5A" color="white" onPress={() => this.uploadImage(image) && this.toProfile()}
        />
        </View>
        <View style={{marginLeft: 20}} onStartShouldSetResponder={() => this.toProfile()}>
              <Image source={back} style={{width: 26, height: 26}}></Image>
          </View>
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

  uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let filename = uri.split('/').pop();
    var storageRef = db.storage().ref().child('profileImages/' + filename);
    storageRef.put(blob).then(function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }).then(function () {
      // Upload completed successfully, now we can get the download URL
      storageRef.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            var usuarios = db.firestore().collection('Usuario').doc(user.uid);
            console.log(user.uid);
            usuarios.update({
              profileImage: downloadURL
            });
          }
        });
      });
    });
  }
};

export default withNavigation(FotoPerfil);

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
    height: 260,
    borderRadius: 130,
    marginLeft: 5,
    marginTop: 30,
  }
});
