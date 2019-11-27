import * as React from 'react';
import { Image, View, StyleSheet, Alert, TouchableHighlight, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase'
import db from '../config';
import Button from './components/Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//var storage = firebase.app().storage("gs://wolfat-9ca6f.appspot.com");

var imageResult

class FotoPerfil extends React.Component {

  state = {
    image: null,
    loading: false
  };

  render() {
    let { image } = this.state;

    
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight onPress={this.chooseImage}>
            <Button
              text="Pick an image from camera roll" background="#330D5A" color="white" onPress={this.chooseImage}
            />
          </TouchableHighlight>
        </View>
        {image && <Image source={{ uri: image }} style={styles.card} />}
        <View style={styles.buttonWrapper}>
          <TouchableHighlight onPress={() => this.uploadImage(image)}>
            <Button
              text="Upload" background="#330D5A" color="white" onPress={() => this.uploadImage(image)}
            />
          </TouchableHighlight>
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
      imageResult = true
    }
  };

  uploadImage = async (uri) => {
    var that = this;
    if (imageResult) {
      that.setState({ loading: true })
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
        that.setState({ loading: false })
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
      this.props.navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'No ha seleccionado ninguna foto')
    }

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
  },
  buttonWrapper: {
    overflow: 'hidden',
    marginBottom: hp('1.5%'),
    height: hp('10%'),
    width: wp('70%'),
    marginTop: hp('5%')
  },
  container: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
  },
});
