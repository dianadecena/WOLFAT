import * as React from 'react';
import { Image, View, StyleSheet, Alert, Picker, Platform, TextInput, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
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
import CardProfile from './components/CardProfile';
//var storage = firebase.app().storage("gs://wolfat-9ca6f.appspot.com");

var imageResult

class SubirImagen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'tattoo',
      loading: false
    }
  }

  state = {
    image: null,
    descripcion: ''
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  toProfile = async () => {
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

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight onPress={this.chooseImage}>
              <Button
                text="Pick an image from camera roll" background="#330D5A" color="white" onPress={this.chooseImage}
              />
            </TouchableHighlight>
          </View>


          {image && <Image source={{ uri: image }} style={styles.card} />}


          <TextInput
            style={styles.input}
            placeholder='Description'
            autoCapitalize="none"
            placeholderTextColor='#000000'
            onChangeText={(descripcion) => this.setState({ descripcion })}
            value={this.state.descripcion}
          />

          <View>
            {this.showPicker()}
          </View>


          <View style={styles.buttonWrapper}>
            <TouchableHighlight onPress={() => this.uploadImage(image)}>
              <Button
                text="Upload" background="#330D5A" color="white" onPress={() => this.uploadImage(image)}
              />
            </TouchableHighlight>
          </View>

        </View>
      </ScrollView>
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
    if (this.state.descripcion != '' && this.state.descripcion != null) {
      var descrip = this.state.descripcion;
    } else {
      var descrip = ''
    }

    var that = this;
    var insertImage = this.props.navigation.getParam('insertImage', 'NO-ID')
    var deleteImage = this.props.navigation.getParam('deleteImage', 'NO-ID')
    var index = this.props.navigation.getParam('index', 'NO-ID')

    if (imageResult) {
      that.setState({ loading: true })
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
        that.setState({ loading: false })
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
                  timestamp: Date.now(),
                  descripcion: descrip,
                  like: 0
                });
              } else if (value == 'estetica') {
                console.log(value)
                console.log("Es estetica el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 2,
                  timestamp: Date.now(),
                  descripcion: descrip,
                  like: 0
                });
              }
              else if (value == 'piercing') {
                console.log(value)
                console.log("Es piercing el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 3,
                  timestamp: Date.now(),
                  descripcion: descrip,
                  like: 0
                });
              } else {
                console.log(value)
                console.log("Es makeup el valor")
                db.firestore().collection('Posts').add({
                  image: downloadURL,
                  uid: user.uid,
                  tipo: 4,
                  timestamp: Date.now(),
                  descripcion: descrip,
                  like: 0
                });
              }
            }


            const card = <CardProfile imageUri={downloadURL} uid={user.uid} opcion={'Hola'} key={index} index={index} delete={deleteImage} />
            insertImage(downloadURL);
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
  container: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: wp('90%'),
    height: hp('7.5%'),
    backgroundColor: 'white',
    margin: '2.5%',
    padding: '2.5%',
    color: '#000000',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: hp('2.5%'),
    fontWeight: '300'
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
