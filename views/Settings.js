import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import firebase from 'firebase';
import db from "../config";

export default class ListIconExample extends Component {
    toUpdate = async () => {
        this.props.navigation.navigate('EditarPerfil');
    }

    signOutAlert = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Seguro que desea cerrar sesión?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'SI', onPress: () => this.signOut() },
            ]
        )
    }

    signOut = () => {
        firebase.auth().signOut().then(function () {
            console.log("Sesion Cerrada")
        }).catch(function (error) {
            console.log(error)
        });
    }

    deleteUserAlert = () => {
        Alert.alert(
            'Eliminar Usuario',
            '¿Seguro que desea eliminar su usuario?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'SI', onPress: () => this.deleteUser() },
            ]
        )
    }

    toInit = async () => {
        await sleep(2000)
        this.props.navigation.navigate('Loading');
    }

    deleteUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                var id = user.uid
                db.firestore().collection('Posts').where('uid', '==', id).get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.delete().then(() => {
                            console.log("Document successfully deleted!");
                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                    });
                });
                db.firestore().collection('Usuario').doc(user.uid).delete()
            }
        });

    }
    /*<ListItem icon onPress={() => this.deleteUserAlert()}>
                        <Left>
                            <Button onPress={() => this.deleteUserAlert()} style={{ backgroundColor: "#fffff", color: '#000000' }}>
                                <Icon active name="deleteuser" type='AntDesign' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{ color: '#ffffff' }}>Eliminar Perfil</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>*/

    render() {
        return (
            <Container style={styles.backgroundContainer}>
                <Content>
                    <ListItem icon onPress={() => this.toUpdate()}>
                        <Left>
                            <Button onPress={() => this.toUpdate()} style={{ backgroundColor: "#fffff", color: '#000000' }}>
                                <Icon active name="edit" type='AntDesign' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{ color: '#ffffff' }}>Editar Perfil</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => this.signOutAlert()}>
                        <Left>
                            <Button onPress={() => this.signOutAlert()} style={{ backgroundColor: "#fffff", color: '#000000' }}>
                                <Icon active name="log-out" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{ color: '#ffffff' }}>Cerrar Sesión</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141414'
    },
    backgroundContainer: {
        backgroundColor: '#141414',
        width: null,
        height: null,
    },
    card: {
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: 260,
        height: 360,
        borderRadius: 20,
        marginLeft: 5,
        marginBottom: 25,
    },
    bottomCard: {
        backgroundColor: '#330D5A',
        width: 160,
        height: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'white',
        marginLeft: 0,
        shadowOpacity: 1.0,
        marginTop: 0,
        opacity: .7
    }
});