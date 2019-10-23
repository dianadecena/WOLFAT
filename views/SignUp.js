import React, { Component } from "react";
import * as Google from 'expo-google-app-auth'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from "react-native";
import firebase from 'firebase'
import Button from './components/Button';
import 'firebase/auth'
import '@firebase/firestore'

var db = firebase.firestore(); 

class SignUp extends Component {

    state = {
        nombre: '', apellido: '', username: '', password: '', email: '', ubicacion: ''
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    async register(nombre, apellido, nombreUsuario, email, password, ubicacion) {
      //await Firebase.auth.createUserWithEmailAndPassword(email, password)
      /*return Firebase.auth.currentUser.updateProfile({
        displayName: nombreUsuario,
        Nombre:nombre,
        Apellido: apellido,
        email: email, 
        password: password,
        Ubicacion: ubicacion
      })*/
      db.collection("Usuario").add({
        Nombre: nombre,
        Apellido: apellido,
        Ubicacion: ubicacion,
        displayName: nombreUsuario,
        email: email,
        password: password
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    }

  render() {
    const { nombre, apellido, username, email, password, ubicacion} = this.state

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
          text="SIGN UP" background="#330D5A" color="white" onPress={()=> this.register(nombre, apellido, username,
            password, email, ubicacion)}
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