import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import db from '../../config';
import moment from "moment";


class Card extends React.Component {

  _isMounted = false;
  
  state = {
    name: '',
    profileImage: null,
    loading: false
  }

  componentDidMount () {
    this._isMounted = true;

    try {
      this.getUsernames();
    }
    catch (error) {
      console.log(error);
    }
  };
  
  viewProfile(uid){
    this.props.navigation.navigate('ViewProfile', {
      uid: uid,
    });
  }

  getUsernames() {
    this.setState({
      loading: true,
    });
    db.firestore().collection('Usuario').doc(this.props.uid).get()
    .then(doc => {
      if (this._isMounted) {
        this.setState({ 
        name: doc.data().displayName,
        profileImage: doc.data().profileImage,
        loading: false
        })
      }
    });
  }
  catch (error) {
    console.log(error);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    if(!this.state.loading) {
    return (
        <View style={styles.card}>
        <Text style={{color: 'white'}}>{moment(this.props.timestamp).fromNow()}</Text>
        <View onStartShouldSetResponder={() => this.imageDetails(this.props.imageUri)}>
        </View> 
        <Image source={{uri: this.props.imageUri.toString()}} style={styles.topCard}/>
        <View style={styles.bottomCard}>
        <Image source={{ uri: this.state.profileImage}} style={{ borderRadius: 15, width: 30, height: 30,
        marginLeft: 10, marginTop: 5}} />
        <Text onStartShouldSetResponder={() => this.viewProfile(this.props.uid)}
        style={{color: 'white', marginLeft: 47, marginTop: -25}}>{this.state.name}</Text>  
        </View>
        </View>
    );
    } else {
      return null 
    }
  }
}

export default withNavigation(Card);

const styles = StyleSheet.create({
  topCard: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 160,
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
  },
  card: {
    padding: 6,
  }
});

