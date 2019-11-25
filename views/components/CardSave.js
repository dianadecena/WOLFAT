import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import db from '../../config';
import guardado from '../assets/saved.png';
import firebase from 'firebase';
import noGuardado from '../assets/no-save.png';

class CardSave extends React.Component {

    _isMounted = false;

    state = {
        name: '',
        nombre: '',
        apellido: '',
        profileImage: null,
        loading: false,
        imageSaved: guardado
    }

    componentDidMount() {

        this._isMounted = true;

        try {
            this.getUsernames();
        }
        catch (error) {
            console.log(error);
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

    getUsernames() {
        this.setState({
          loading: true,
        });
        var user = firebase.auth().currentUser;
        db.firestore().collection('Usuario').doc(this.props.uid).get()
          .then(doc => {
              this.setState({
                name: doc.data().displayName,
                nombre: doc.data().Nombre,
                apellido: doc.data().Apellido,
                profileImage: doc.data().profileImage,
                loading: false
              });
          });
      }
      catch(error) {
        console.log(error);
      }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (!this.state.loading) {
            return (
                <View style={styles.card}>
                    <View onPress={() => this.imageDetails(this.props.imageUri)}>
                    </View>
                    <Image source={{ uri: this.props.imageUri.toString() }} style={styles.topCard} />
                    <View style={styles.bottomCard}>
                        <Image source={{ uri: this.state.profileImage }} style={{
                            borderRadius: 15, width: 30, height: 30,
                            marginLeft: 10, marginTop: 5
                        }} />
                        <Text style={{ color: 'white', marginLeft: 47, marginTop: -25 }}>{this.props.uid}</Text>
                        <View onStartShouldSetResponder={() => this.saveImage(this.props.imageUri)} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={this.state.imageSaved} style={{ width: 26, height: 26, marginLeft: '85%', marginTop: -25 }} />
                        </View>
                    </View>
                </View>
            );
        } else {
            return null
        }
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