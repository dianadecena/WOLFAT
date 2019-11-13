import React, { Component } from "react";
import { Image, ImageBackground } from 'react-native';
import back from './assets/back.png';
import { withNavigation } from 'react-navigation';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert
} from "react-native";
import Button from './components/Button';
import bg from './assets/loginbg.jpg';

import firebase from 'firebase';
import db from '../config';

class Login extends Component {

    state = {
        email: '', password: ''
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    toProfile = async () => {
        //await sleep(2000)
        this.props.navigation.navigate('Init');
      }

    login = async () => {
        const { email, password } = this.state
        if (this.state.email != '' && this.state.password != '') {
            firebase.auth().signInWithEmailAndPassword(email, password)
            db.firestore().collection('Usuario').where('email', '==', email).where('password', '==', password).get()
                .then((snapshot) => {
                    if (snapshot.empty) {
                        Alert.alert('Error', 'El email y la contraseña no coinciden')
                        return;
                    }
                    else {
                        console.log('Si existe');
                        this.props.navigation.navigate('Dashboard');
                    }
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
        } else {
            Alert.alert('Error', 'No se pueden dejar campos en blanco')
        }

    }

    render() {
        return (
            <ImageBackground source={bg} style={styles.backgroundContainer}>
            <View style={styles.container}>
                <View style={{ marginTop: 40 }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        autoCapitalize="none"
                        placeholderTextColor='black'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.nombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor='black'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                </View>
                <View style={{ marginTop: 40 }} onStartShouldSetResponder={this.login}>
                    <Button
                        text="LOGIN" background="#330D5A" color="white" onPress={this.login}
                    />
                </View>

                <View style={{ marginLeft: 20 }} onStartShouldSetResponder={() => this.toProfile()}>
                    <Image source={back} style={{ width: 26, height: 26 }}></Image>
                </View>
      </View>
      </ImageBackground>
          

        );
    }
}
export default Login

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
      },
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});