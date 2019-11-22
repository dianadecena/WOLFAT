import React, { Component } from "react";
import back from './assets/back.png';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ImageBackground
} from "react-native";
import Button from './components/Button';

import firebase from 'firebase';
import db from '../config';
import bg from './assets/makeup1.jpg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class SignUp extends Component {

  state = {
    nombre: '', apellido: '', username: '', password: '', email: '', ubicacion: ''
  }

  toProfile = async () => {
    //await sleep(2000)
    this.props.navigation.navigate('Init');
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  dbRedister = async () => {
    const { nombre, apellido, username, email, password, ubicacion } = this.state
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)

    if (response.user.uid) {
      const user = {
        uid: response.user.uid,
        Nombre: nombre,
        Apellido: apellido,
        Ubicacion: ubicacion,
        displayName: username,
        email: email,
        password: password
      }
      db.firestore().collection('Usuario').doc(response.user.uid).set(user)

    }
    this.props.navigation.navigate('Dashboard')
  }

  register = async () => {
    const { nombre, apellido, username, email, password, ubicacion } = this.state
    if (this.state.nombre != '' && this.state.apellido != '' && this.state.username != '' && this.state.password != '' && this.state.email != '' && this.state.ubicacion != '') {
      try {
        db.firestore().collection('Usuario').where('displayName', '==', username).get()
          .then((snapshot) => {
            if (snapshot.empty) {
              this.dbRedister()
            }
            else {
              Alert.alert('Error', 'El usuario ya está en uso')
            }
          })
          .catch((err) => {
            console.log('Error getting documents', err);
          });





      } catch (e) {
        alert(e)
      }
    } else {
      Alert.alert('Error', 'No se pueden dejar campos en blanco')
    }


  }

  render() {

    return (
      <ImageBackground source={bg} style={styles.backgroundContainer}>
        <View style={styles.container}>
          <View style={{ marginTop: hp('5%') }}>
            <TextInput
              style={styles.input}
              placeholder='Nombre'
              autoCapitalize="none"
              placeholderTextColor='white'
              onChangeText={(nombre) => this.setState({ nombre })}
              value={this.state.nombre}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder='Apellido'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={(apellido) => this.setState({ apellido })}
            value={this.state.apellido}
          />
          <TextInput
            style={styles.input}
            placeholder='Username'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder='Ubicacion'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={(ubicacion) => this.setState({ ubicacion })}
            value={this.state.ubicacion}
          />
          <View style={styles.buttonWrapper} onStartShouldSetResponder={() => this.register()}>
            <Button
              text="SIGN UP" background="#330D5A" color="white" onPress={this.register}
            />
          </View>

        </View>
      </ImageBackground>
    );
  }
}
export default SignUp;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  input: {
    width: wp('90%'),
    height: hp('7.5%'),
    backgroundColor: 'transparent',
    margin: '2.5%',
    padding: '2.5%',
    color: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: hp('2.5%'),
    fontWeight: '300'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    overflow: 'hidden',
    marginBottom: hp('2.5%'),
    height: hp('10%'),
    width: wp('70%'),
    marginTop: hp('3.5%')
  },
});