import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Icon, Container, Header, Content } from 'native-base'

class SavedImages extends Component {
    retrieveSaved = async () => {
        try {
            this.setState({
                loading: true,
            });

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log(user.uid);

                    db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
                        if (doc.exists) {
                            nombre = doc.data().Nombre
                            apellido = doc.data().Apellido
                            ubicacion = doc.data().Ubicacion
                            descripcion = doc.data().Descripcion
                            savedImages = doc.data().saveImages
                            fotoPerfil = doc.data().profileImage
                            username = doc.data().displayName
                            uid = doc.data().uid
                            console.log(uid)
                            this.setState({ nombre })
                            this.setState({ apellido })
                            this.setState({ ubicacion })
                            this.setState({ descripcion })
                            if (savedImages != null) {
                                var saved = savedImages.reverse()
                                this.setState({ imagesUser: saved })
                                this.setState({ opcion: 'VER SUBIDAS' })
                            }
                            if (fotoPerfil == null) {
                                fotoPerfil = 'https://firebasestorage.googleapis.com/v0/b/wolfat-7c5c9.appspot.com/o/profile.jpg?alt=media&token=1089243a-2aa6-4648-a318-604e0c4a9503'
                                this.setState({ fotoPerfil })
                            } else {
                                fotoPerfil = doc.data().profileImage
                                this.setState({ fotoPerfil })
                            }
                            this.setState({ username })
                            this.setState({ uid })
                            this.setState({ loading: false })
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
        catch (error) {
            console.log(error);
        }
    }




    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Text>SavedImages</Text>
                </Content>
            </Container>
        );
    }
}
export default SavedImages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});