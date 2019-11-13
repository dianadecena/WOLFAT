import React, { Component } from "react";
import { Image, SafeAreaView, ScrollView } from 'react-native';
import back from './assets/back.png';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import Button from './components/Button';

import firebase from 'firebase';
import db from '../config';
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

  register = async () => {
    const { nombre, apellido, username, email, password, ubicacion } = this.state

    if (this.state.nombre != '' && this.state.apellido != '' && this.state.username != '' && this.state.password != '' && this.state.email != '' && this.state.ubicacion != '') {
      try {
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
      } catch (e) {
        alert(e)
      }
    } else {
      Alert.alert('Error', 'No se pueden dejar campos en blanco')
    }


  }

  render() {

    return (
      <View style={styles.container}>
            <View style={{ marginTop: hp('5%') }}>
              <TextInput
                style={styles.input}
                placeholder='Nombre'
                autoCapitalize="none"
                placeholderTextColor='black'
                onChangeText={(nombre) => this.setState({ nombre })}
                value={this.state.nombre}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder='Apellido'
              autoCapitalize="none"
              placeholderTextColor='black'
              onChangeText={(apellido) => this.setState({ apellido })}
              value={this.state.apellido}
            />
            <TextInput
              style={styles.input}
              placeholder='Username'
              autoCapitalize="none"
              placeholderTextColor='black'
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor='black'
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize="none"
              placeholderTextColor='black'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              placeholder='Ubicacion'
              autoCapitalize="none"
              placeholderTextColor='black'
              onChangeText={(ubicacion) => this.setState({ ubicacion })}
              value={this.state.ubicacion}
            />
            <View style={styles.buttonWrapper} onStartShouldSetResponder={() => this.register()}>
              <Button
                text="SIGN UP" background="#330D5A" color="white" onPress={this.register}
              />
            </View>

      </View>
    );
  }
}
export default SignUp;

const styles = StyleSheet.create({
  input: {
    width: wp('90%'),
    height: hp('7.5%'),
    backgroundColor: 'white',
    margin: '2.5%',
    padding: '2.5%',
    color: 'black',
    borderRadius: 20,
    fontSize: hp('2.5%'),
    fontWeight: '300'
  },
  container: {
    backgroundColor: '#141414',
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