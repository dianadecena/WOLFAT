import React, { Component } from "react";
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

var nombre, apellido, username, email, ubicacion;

class EditarPerfil extends Component {

  state = {
    nombre, apellido, username, email, ubicacion
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        
        db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
              nombre = doc.data().Nombre
              apellido = doc.data().Apellido
              username = doc.data().displayName
              email = doc.data().email
              ubicacion = doc.data().Ubicacion
              this.setState({nombre})
              this.setState({apellido})
              this.setState({username})
              this.setState({email})
              this.setState({ubicacion})
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      } else {
        // No user is signed in.
      }
    });
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
          this.props.navigation.navigate('Dashboard')
        }
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
        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            placeholderTextColor='black'
            onChangeText={(nombre) => this.setState({ nombre })}
            value={this.state.nombre}
          />
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholderTextColor='black'
          onChangeText={(apellido) => this.setState({ apellido })}
          value={this.state.apellido}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholderTextColor='black'
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          //editable='false'
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          //editable='false'
        />
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholderTextColor='black'
          onChangeText={(ubicacion) => this.setState({ ubicacion })}
          value={this.state.ubicacion}
        />
        <View style={{ marginTop: 40 }}>
          <Button
            text="UPDATE" background="#330D5A" color="white" onPress={this.register}
          />
        </View>
      </View>
    );
  }
}
export default EditarPerfil;

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