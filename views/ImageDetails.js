import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Button, Animated } from 'react-native';
import liked from './assets/like.png';
import close from './assets/close.png'
import { withNavigation } from 'react-navigation';
import noLiked from './assets/no-like.png'
import db from '../config';

class ImageDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLiked: noLiked,
      likes: 0,
      id: ''
    };
  }

    closeImage(){
        this.props.navigation.navigate('Dashboard');
    }

    viewProfile(){
      this.props.navigation.navigate('Profile');
    }

    likePost(image) {
      let that = this;

      if(that.state.isLiked == noLiked) {
        that.setState({ isLiked: liked })
        db.firestore().collection('Posts').where('image', '==', image).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data().like)
            that.setState({ id: doc.id, likes: doc.data().like + 1});
            that.updatePost();
          });
      });
      } else {
        that.setState({ isLiked: noLiked })
      }
    }

    updatePost() {
      db.firestore().collection('Posts').doc(this.state.id).update({ like: this.state.likes });
    }

  render() {
    const image = this.props.navigation.getParam('image', 'NO-ID')
    const descripcion = this.props.navigation.getParam('descripcion', 'NO-ID')
    const nombre = this.props.navigation.getParam('nombre', 'NO-ID')
    const apellido = this.props.navigation.getParam('apellido', 'NO-ID')

    return (
      <ImageBackground source={{uri: image.toString()}} 
      style={styles.backgroundContainer}>
          <View style={{marginLeft: 300}} onStartShouldSetResponder={() => this.closeImage()}>
              <Image source={close} style={{width: 26, height: 26}}></Image>
          </View>
          <View style={styles.card}>

        <View style={{display:'flex', flexDirection:'row', height: 60, marginTop: 20}}>
        <View style={{flex:1, padding:6, height: 50}}>
        <Text style={{color:'white', fontSize:22}}>{nombre} {apellido}</Text>
        </View>
        
        <View style={{padding:6, height: 50}} onStartShouldSetResponder={() => this.likePost(image)}>
        <Image source={this.state.isLiked} style={{width: 24, height:24}}></Image>
        </View>
        </View>

        <View style={{padding:6, height: 60, alignItems:'center', 
        justifyContent:'center'}}>
        <Text style={{color:'white', fontSize:12}}>{descripcion}</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent:'center', marginTop:10}}>
        <View style={{width: 150, padding:6}}>
        <Button title="VER PERFIL" color="black" onPress={() => this.viewProfile()}></Button>
        </View>
        </View>

          </View>
      </ImageBackground>
    );
  }
}

export default withNavigation(ImageDetails);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: 100,
    backgroundColor: 'black',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    width: 280,
    height: 350
  }
});