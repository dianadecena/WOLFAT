import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button} from 'react-native';
import { withNavigation } from 'react-navigation';

class Profile extends React.Component {

  uploadImage(){
    this.props.navigation.navigate('SubirImagen');
  }

  render() {
    const image = this.props.navigation.getParam('image', 'NO-ID')
    return (
      <ScrollView style={styles.backgroundContainer} decelerationRate={0.5}>
        <View>
        <Image source={require('./assets/header.jpg')} style={{height: 200}}/>
        <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('./assets/profile.jpg')} style={{borderRadius: 50, width: 100, height: 100}}/>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', marginTop: 10}}> 
        <Text style={{color:'white'}}>Nombre Apellido</Text>
        <Text style={{color:'white'}}>Caracas, Venezuela</Text>
        <Text style={{color:'white'}}>Descripción</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', height: 40}}>
        <View style={{width: 150}}>
        <Button title="EDITAR PERFIL" color="#330D5A"></Button>
        </View>
        <View style={{width: 40, height: 40, borderRadius: 50, 
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
        onStartShouldSetResponder={() => this.uploadImage()}
        >
        <Image style={{resizeMode: 'cover'}} 
        source={require('./assets/camera.png')}/>
        </View>

        </View>

        <View style={{alignItems:'center', justifyContent:'center', marginTop:40}}>
        <Image source={{ uri: image }} style={styles.card}/>
        </View>

        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
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
    marginBottom:160,
  }
});

