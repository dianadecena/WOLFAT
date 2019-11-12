import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import db from '../config';
import Button from './components/Button';
import header from './assets/wolfat2.jpg';


var nombre, apellido, ubicacion, descripcion, fotoPerfil, imagesUser = [], username, result;

class ViewProfile extends React.Component {

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
    nombre,
    apellido,
    ubicacion,
    descripcion,
    imagesUser,
    fotoPerfil,
    username,
    result,
    loading: false
    };
    this.retrieveData = this.retrieveData.bind(this);
  }

  _isMounted = false;

  componentDidMount = () => {
    try {
        this.retrieveData();
    }
    catch (error) {
      console.log(error);
    }
  };

  retrieveData = async () => {
    try {
      this.setState({
        loading: true,
      });

    this._isMounted = true;
    const uid = this.props.navigation.getParam('uid', 'NO-ID')
    const userRef = db.firestore().collection("Usuario");
    const that = this;
    if(this._isMounted){
      userRef.doc(uid).get().then((doc) => {
        if (doc.exists) {
          nombre = doc.data().Nombre
          apellido = doc.data().Apellido
          ubicacion = doc.data().Ubicacion
          descripcion = doc.data().Descripcion
          imagesUser = doc.data().images
          fotoPerfil = doc.data().profileImage
          username = doc.data().displayName
          that.setState({ nombre })
          that.setState({ apellido })
          that.setState({ ubicacion })
          that.setState({ descripcion })
          that.setState({ imagesUser })
          that.setState({ fotoPerfil })
          that.setState({ username })
          that.setState({ loading: false })
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
    
    }
    catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {

    const items = []
    if (Array.isArray(imagesUser) && imagesUser.length) {
    for (const [index, image] of this.state.imagesUser.entries()) {
      items.push(<Image source={{ uri: image }} key={index} style={styles.card} />)
    }
  }

    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      );
    }

    return (
      <ScrollView style={styles.backgroundContainer} decelerationRate={'fast'}
      refreshControl={
        <RefreshControl
        refreshing={this.state.loading}
        />
        }>
        <View>
          <Image source={header} style={{ height: 200 }} />
          <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: fotoPerfil }} style={{ borderRadius: 50, width: 100, height: 100}} />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: 'white' }}>@{this.state.username}</Text>
            <Text style={{ color: 'white' }}>{this.state.nombre} {this.state.apellido}</Text>
            <Text style={{ color: 'white' }}>{this.state.ubicacion}</Text>
            <Text style={{ color: 'white' }}>{this.state.descripcion}</Text>
          </View>
        
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            {items}
          </View>

        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(ViewProfile);

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
  }
});