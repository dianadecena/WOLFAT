import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, ActivityIndicator, RefreshControl, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';
import CardSave from './components/CardSave'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Container, Header, Content, Left } from 'native-base'
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
            console.log(error);
        }
    };

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
                            savedImages = doc.data().saveImages
                            if (savedImages != null) {
                                var saved = savedImages.reverse()
                                console.log(saved)
                                this.setState({ imagesUser: saved })
                                this.setState({ opcion: 'VER SUBIDAS' })
                            }
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

        const items = []
        if (Array.isArray(savedImages) && savedImages.length) {
            for (const [index, image] of this.state.imagesUser.entries()) {
                items.push(<CardSave imageUri={image} saved={this.state.imagesUser} key={index} />)
            }
        }

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        if (this.state.imagesUser == null) {
            return (
                <View style={styles.container}>
                    <Text>NO POSTS YET</Text>
                </View>
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