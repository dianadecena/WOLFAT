import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from "react-native";
import Button from './components/Button';
  
import firebase from 'firebase';
import db from '../config';

class SignUp extends Component {

    state = {
        nombre: '', apellido: '', username: '', password: '', email: '', ubicacion: ''
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    register = async () => {
      const { nombre, apellido, username, email, password, ubicacion} = this.state

      try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        if(response.user.uid) {
          const user = {
            uid: response.user.uid,
            Nombre: nombre,
            Apellido: apellido,
            Ubicacion: ubicacion,
            displayName: username,
            email: email,
            password: password
          }
          db.collection('Usuario').doc(response.user.uid).set(user)
        }
      } catch (e) {
        alert(e)
      }
    }

  render() {

    return (
        <View style={styles.container}>
        <View style={{marginTop:40}}>
        <TextInput
          style={styles.input}
          placeholder='nombre'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(nombre) => this.setState({nombre})}
          value={this.state.nombre}
        />
        </View>
        <TextInput
          style={styles.input}
          placeholder='apellido'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(apellido) => this.setState({apellido})}
          value={this.state.apellido}
        />
        <TextInput
          style={styles.input}
          placeholder='username'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder='password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={styles.input}
          placeholder='email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder='ubicacion'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(ubicacion) => this.setState({ubicacion})}
          value={this.state.ubicacion}
        />
        <View style={{marginTop:40}}>
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
        width: 300,
        height: 50,
        backgroundColor: 'white',
        margin: 10,
        padding: 12,
        color: 'black',
        borderRadius: 20,
        fontSize: 18,
        fontWeight: '300'
      },
  container: {
    backgroundColor: '#141414',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});