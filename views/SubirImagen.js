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

  /*ploadImage(image){
    this.props.navigation.navigate('Profile', {
      image: image,
    });
  }
*/

  chooseImage = async() => {
    let result =  await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri).then((uploadTask)=> {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      }); 
    }
  }

  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let filename = uri.split('/').pop();
    var ref = db.storage().ref().child('${user}/${filename}');
    return await ref.put(blob);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <Button
          title="Pick an image from camera roll"
          onPress={this.chooseImage}
        />
        
      <Button
          title="UPLOAD"
          color="black"
          onPress={() => this.uploadImage()}
        />
      </View>
    );
  }

  /*componentDidMount() {
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

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };*/
}

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
