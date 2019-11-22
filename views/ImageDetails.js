import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Button, ActivityIndicator } from 'react-native';
import liked from './assets/like.png';
import close from './assets/close.png'
import { withNavigation } from 'react-navigation';
import noLiked from './assets/no-like.png'
import db from '../config';
import firebase from 'firebase';

let state = { isLiked: noLiked, likes: 0, id: '', totalLikes: 0, loading: false, fontLoaded: false, imageURL: ''};

class ImageDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = state;
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

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
        loading: true
      });

      var image = this.props.navigation.getParam('image', 'NO-ID')

      const postsRef = db.firestore().collection("Posts");
      const that = this;

      this.unsubscribe = postsRef.where('image', '==', image).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          that.setState({ totalLikes: doc.data().like, imageURL: image});
          that.retrieveLike(image);
        });
      });
    }
    catch (error) {
      console.log(error);
    }
  }

    retrieveLike(image) {
      var user = firebase.auth().currentUser;
      const that = this;

      that.setState({
        loading: true,
      });

      db.firestore().collection('Usuario').doc(user.uid).get()
      .then(doc => {
      var saved = [];
        saved = doc.data().likedImages
        console.log(saved)
        if(saved != null && saved.includes(image)) {
          that.setState({ isLiked: liked, loading: false })
        } else {
          that.setState({ isLiked: noLiked, loading: false })
        }
      });
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
            that.setState({ id: doc.id, likes: doc.data().like + 1});
            that.updatePost(image);
          });
      });
      } else {
        that.setState({ isLiked: noLiked })
        db.firestore().collection('Posts').where('image', '==', image).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            that.setState({ id: doc.id, likes: doc.data().like - 1});
            that.updatePost(image);
          });
      });
      }
    }

    updatePost(image) {
      let that = this;
      db.firestore().collection('Posts').doc(this.state.id).update({ like: this.state.likes });
      that.saveLike(image);
    }

    saveLike(image){
      var user = firebase.auth().currentUser;
      let that = this;
  
        if (user) {
          const usuario = db.firestore().collection('Usuario').doc(user.uid);      
            if(this.state.isLiked == liked) {
              usuario.update({
                likedImages: firebase.firestore.FieldValue.arrayUnion(image)
              });
            } else {
              usuario.update({
                likedImages: firebase.firestore.FieldValue.arrayRemove(image)
              });
            }
        } else {
        // No user is signed in.
        }
    }

    componentWillUnmount() {
        state = this.state;
    }

  render() {
    const image = this.props.navigation.getParam('image', 'NO-ID')
    const descripcion = this.props.navigation.getParam('descripcion', 'NO-ID')
    const nombre = this.props.navigation.getParam('nombre', 'NO-ID')
    const apellido = this.props.navigation.getParam('apellido', 'NO-ID')

    
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <ImageBackground source={{uri: image.toString()}} 
      style={styles.backgroundContainer}>
          <View style={{marginLeft: 300, marginTop: -10}} onStartShouldSetResponder={() => this.closeImage()}>
              <Image source={close} style={{width: 26, height: 26}}></Image>
          </View>
          <View style={styles.card}>

        <View style={{flex:1, padding:6, height: 50, marginTop: 20, marginLeft: 10}}>
        <Text style={{color:'white', fontSize: 36, fontFamily: 'old-london'}}>{nombre} {apellido}</Text>
        </View>

        <View style={{padding:6, height: 60, alignItems:'center', 
        justifyContent:'center'}}>
        <Text style={{color:'white', fontSize:12}}>{descripcion}</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent:'center', marginTop:30}}>
        <View style={{width: 150, padding:6}}>
        <Button title="VER PERFIL" color="black" onPress={() => this.viewProfile()}></Button>
        </View>
        </View>

        <View style={{display:'flex', flexDirection:'row', height: 60, marginTop: 30}}>
        <View style={{padding:6, height: 60, alignItems:'center', 
        justifyContent:'center'}}>
        <Text style={{color:'white', fontSize:12, marginLeft: 10}}>{this.state.totalLikes} persons liked this post</Text>
        </View>
        
        <View style={{padding:6, height: 50}} onStartShouldSetResponder={() => this.likePost(image)}>
        <Image source={this.state.isLiked} style={{width: 40, height:40, marginLeft: 70}}></Image>
        </View>
        </View>

          </View>
      </ImageBackground>
    );
  }
}

export default withNavigation(ImageDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414'
  },
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
    height: 300
  }
});