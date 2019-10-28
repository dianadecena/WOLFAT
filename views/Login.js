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

class Login extends Component {

    state = {
        email: '', password: ''
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
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
                <View style={{ marginTop: 40 }}>
                    <Button
                        text="SIGN UP" background="#330D5A" color="white" onPress={this.login}
                    />
                </View>

            </View>

        );
    }
}
export default Login

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