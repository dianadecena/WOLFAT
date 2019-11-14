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
import bg from './assets/login1.jpg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
                <View style={{ marginTop: hp('20%') }}>
                    <TextInput
                        style={styles.input}
                        placeholder='email'
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.nombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.buttonWrapper} onStartShouldSetResponder={this.login}>
                    <Button
                        text="LOGIN" background="#330D5A" color="white" onPress={this.login}
                    />
                </View>

                <View style={{ marginLeft: wp('7%'), marginTop: hp('2%') }} onStartShouldSetResponder={() => this.toProfile()}>
                    <Image source={back} style={{ width: wp('10%'), height: hp('5%') }}></Image>
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
        width: wp('90%'),
        height: hp('8%'),
        backgroundColor: 'transparent',
        margin: '2.5%',
        padding: '2.5%',
        color: 'black',
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
        marginTop: hp('5%')
    }
});