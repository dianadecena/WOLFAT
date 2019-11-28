import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';
import CardLike from './components/CardLike'
var nombre, apellido, ubicacion, descripcion, fotoPerfil, imagesUser = [], savedImages = [], username, result, uid, timestamp;

class SavedImages extends React.Component {
    state = {
        nombre,
        apellido,
        ubicacion,
        descripcion,
        imagesUser,
        savedImages,
        fotoPerfil,
        opcion: 'VER GUARDADAS',
        username,
        result,
        uid,
        timestamp,
        loading: false
    }


    _isMounted = false;

    componentDidMount = () => {
        try {
            this.retrieveSaved();
        }
        catch (error) {
            Alert.alert('Error', 'No se pudo cargar la data.')
        }
    };

    retrieveSaved = async () => {
        try {
            this.setState({
                loading: true,
            });

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    db.firestore().collection('Usuario').doc(user.uid).get().then((doc) => {
                        if (doc.exists) {
                            nombre = doc.data().Nombre
                            apellido = doc.data().Apellido
                            ubicacion = doc.data().Ubicacion
                            descripcion = doc.data().Descripcion
                            savedImages = doc.data().likedImages
                            fotoPerfil = doc.data().profileImage
                            username = doc.data().displayName
                            uid = doc.data().uid
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
                            this.setState({
                                loading: false
                              });
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
            Alert.alert('Error', 'No se pudo cargar la data.')
        }
    }

    render() {

        const items = []
        if (Array.isArray(savedImages) && savedImages.length) {
            for (const [index, image] of this.state.imagesUser.entries()) {
                items.push(<CardLike imageUri={image} uid={this.state.uid} key={index} />)
            }
        }

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        if (this.state.savedImages == null || (Array.isArray(savedImages) && savedImages.length === 0)) {
            return (
                <ScrollView contentContainerStyle={styles.container} decelerationRate={'fast'}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this.retrieveSaved}
                        />
                    }>
                    <Text style={{ color: 'white', fontSize: 18 }}>NO HAY FOTOS AUN</Text>
                </ScrollView>
            );
        }

        return (
            <ScrollView style={styles.backgroundContainer} decelerationRate={'fast'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.retrieveSaved}
                    />
                }>
                <View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                        {items}
                    </View>

                </View>
            </ScrollView>
        );
    }
}

export default withNavigation(SavedImages);

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