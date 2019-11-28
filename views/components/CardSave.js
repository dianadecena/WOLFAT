import React from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import db from '../../config';
import guardado from '../assets/saved.png';
import firebase from 'firebase';
import noGuardado from '../assets/no-save.png';
class CardSave extends React.Component {

    _isMounted = false;

    state = {
        name: '',
        uid: '',
        apellido: '',
        profileImage: null,
        loading: false,
        imageSaved: guardado
    }

    componentDidMount() {

        this._isMounted = true;

        try {
            this.getIDs();
        }
        catch (error) {
            Alert.alert('Error', 'No se pudo cargar la data.')
        }
    };

    imageDetails(image) {
        this.props.navigation.navigate('ImageDetails', {
            image: image,
        });
    }

    saveImage(image) {
        var user = firebase.auth().currentUser;

        if (user) {
            const usuario = db.firestore().collection('Usuario').doc(user.uid);
            if (this.state.imageSaved == noGuardado) {
                usuario.update({
                    saveImages: firebase.firestore.FieldValue.arrayUnion(image)
                });
                this.setState({ imageSaved: guardado })
            } else if (this.state.imageSaved == guardado) {
                usuario.update({
                    saveImages: firebase.firestore.FieldValue.arrayRemove(image)
                });
                this.setState({ imageSaved: noGuardado })
            }
        } else {
            // No user is signed in.
        }
    }

    getIDs() {
        const postsRef = db.firestore().collection("Posts");
        postsRef.get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                if (this.props.imageUri == doc.data().image) {
                    this.getUsernames(doc.data().uid)
                }
            });
        });
    }

    getUsernames(uid) {
        const userRef = db.firestore().collection("Usuario");
        const that = this;

        userRef.doc(uid).get().then(doc => {
            that.setState({
                name: doc.data().displayName,
                profileImage: doc.data().profileImage,
                uid: uid
            })
        });
    }

    viewProfile(uid) {
        this.props.navigation.navigate('ViewProfile', {
            uid: uid,
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.card}>
                <View onPress={() => this.imageDetails(this.props.imageUri)}>
                </View>
                <Image source={{ uri: this.props.imageUri.toString() }} style={styles.topCard} />
                <View style={styles.bottomCard}>
                    <TouchableHighlight onPress={() => this.viewProfile(this.state.uid)} >
                        <Image source={{ uri: this.state.profileImage }} style={{
                            borderRadius: 15, width: 30, height: 30,
                            marginLeft: 10, marginTop: 5
                        }} />
                    </TouchableHighlight>
                    <Text onPress={() => this.viewProfile(this.state.uid)} style={{ color: 'white', marginLeft: 47, marginTop: -25 }}>{this.state.name}</Text>
                    <View onStartShouldSetResponder={() => this.saveImage(this.props.imageUri)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={this.state.imageSaved} style={{ width: 26, height: 26, marginLeft: '85%', marginTop: -25 }} />
                    </View>
                </View>
            </View>
        );
    }
}

export default withNavigation(CardSave);

const styles = StyleSheet.create({
    topCard: {
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: 300,
        height: 240,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'white',
        marginLeft: 0,
        shadowOpacity: 1.0,
        marginTop: 10,
    },
    bottomCard: {
        backgroundColor: '#330D5A',
        width: 300,
        height: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'white',
        marginLeft: 0,
        shadowOpacity: 1.0,
        marginTop: 0,
        opacity: .7
    },
    card: {
        padding: 6,
    }
});