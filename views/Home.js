import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, Button } from 'react-native';
import bgImage from './assets/background.png';
import { Dimensions } from "react-native";
//import Button from './components/Button'
import firebase from 'firebase'
import * as Google from 'expo-google-app-auth'

var width = Dimensions.get('window').width;

class Home extends React.Component {

  state = {
    fontLoaded: false,
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
          .then(function (result) {
            console.log('User Signed In');
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then(function (snapshot) {
                  //console.log('snapshot', snapshot);
                });
            } else {
              firebase
                .database()
                .ref('/users/' + result.user.uid).update({
                  last_logged_in: Date.now()
                })
            }
          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "176101755908-9d2fdp71uctqg0fjl5evi2lpprnkt7hk.apps.googleusercontent.com",
        iosClientId: "176101755908-9ci6pgfcjfcbck5adciov9iustnf5aot.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={{marginTop: 60, padding: 20}}> 
      { this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 90, color: '#141414' }}>
              wolfat
            </Text>
          ) : null }
      </View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center', padding: 10}}>
      <Button title="Create Account" color="black" />
      </View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center', padding: 10}}>
      <Button title="Sign in with Google" color="black" onPress={() => this.signInWithGoogleAsync()}/>
      </View>
      
    </ImageBackground>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  }
});

