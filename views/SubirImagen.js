import * as React from 'react';
import { Image, View, StyleSheet, Alert, Picker, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase'
import db from '../config';
import back from './assets/back.png';
import Button from './components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//var storage = firebase.app().storage("gs://wolfat-9ca6f.appspot.com");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var imageResult, uploadResult;
var userName;

class SubirImagen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'tattoo'
    }
  }

  state = {
    image: null
  };

  toProfile = async () => {
    //await sleep(2000)
    this.props.navigation.navigate('Profile');
  }

  showPicker() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <View style={{ marginLeft: 190, marginTop: 10, marginRight: 80 }} onStartShouldSetResponder={() => this.toProfile()}>
            <Image source={back} style={{ width: wp('10%'), height: hp('5%') }}></Image>
          </View>
          <Picker
            style={{ bottom: 0, left: 0, right: 0, borderColor: TouchableWithoutFeedback, height: 50, width: 400 }}
            selectedValue={this.state.pickerSelection}
            onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelection: itemValue })
            }>
            <Picker.Item label="Tattoo" color="white" value="tattoo" />
            <Picker.Item label="Estetica" color="white" value="estetica" />
            <Picker.Item label="Piercing" color="white" value="piercing" />
            <Picker.Item label="Make-up" color="white" value="makeup" />
          </Picker>
        </View>
      )
    } else {
      return (
        <View style={{ borderRadius: 20, overflow: 'hidden', width: 100 }}>
          <Picker
            selectedValue={this.state.pickerSelection}
            style={{ bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: TouchableWithoutFeedback, height: 50, width: 100, backgroundColor: 'white' }}
            onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelection: itemValue })
            }>
            <Picker.Item label="Tattoo" value="tattoo" />
            <Picker.Item label="Hair" value="estetica" />
            <Picker.Item label="Piercing" value="piercing" />
            <Picker.Item label="Make-up" value="makeup" />
          </Picker>
        </View >
      )
    }
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.buttonWrapper} onStartShouldSetResponder={() => this.chooseImage()}>
          <Button
            text="Pick an image from camera roll" background="#330D5A" color="white" onPress={this.chooseImage}
          />
        </View>


        {image && <Image source={{ uri: image }} style={styles.card} />}



        <View style={styles.buttonWrapper} onStartShouldSetResponder={() => this.uploadImage(image)}>
          <Button
            text="Upload" background="#330D5A" color="white" onPress={() => this.uploadImage(image)}
          />
        </View>

        <View>
          {this.showPicker()}
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
    var value = this.state.pickerSelection;
    var that = this;
    if (imageResult) {
      const response = await fetch(uri);
      const blob = await response.blob();
      let filename = uri.split('/').pop();
      var storageRef = db.storage().ref().child('images/' + filename);
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
              const usuarios = db.firestore().collection('Usuario').doc(user.uid);
              usuarios.update({
                images: firebase.firestore.FieldValue.arrayUnion(downloadURL)
              });
              if (value == 'tattoo') {
                console.log(value)
                console.log("Es tattoo el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 1,
                  timestamp: Date.now()
                });
              } else if (value == 'estetica') {
                console.log(value)
                console.log("Es estetica el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 2,
                  timestamp: Date.now()
                });
              }
              else if (value == 'piercing') {
                console.log(value)
                console.log("Es piercing el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 3,
                  timestamp: Date.now()
                });
              } else {
                console.log(value)
                console.log("Es makeup el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 4,
                  timestamp: Date.now()
                });
              }


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
    height: 330,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'white',
    marginLeft: 5,
    shadowOpacity: 1.0,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonWrapper: {
    overflow: 'hidden',
    marginBottom: hp('1.5%'),
    height: hp('10%'),
    width: wp('70%'),
    marginTop: hp('5%')
  }
});
