import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Button } from 'react-native';
import tattoo from './assets/tattoo1.jpg';
import close from './assets/close.png';
import like from './assets/like.png'
import star from './assets/star.png'
import { withNavigation } from 'react-navigation';

class ImageDetails extends React.Component {

    closeImage(){
        this.props.navigation.navigate('Dashboard');
    }

  render() {
    return (
      <ImageBackground source={tattoo} style={styles.backgroundContainer}>
          <View style={{marginLeft: 300}} onStartShouldSetResponder={() => this.closeImage()}>
              <Image source={close} style={{width: 26, height: 26}}></Image>
          </View>
          <View style={styles.card}>

        <View style={{display:'flex', flexDirection:'row', height: 60, marginTop: 20}}>
        <View style={{flex:1, padding:6, height: 50}}>
        <Text style={{color:'white', fontSize:22}}>Nombre Apellido</Text>
        </View>
        
        <View style={{padding:6, height: 50}}>
        <Image source={like} style={{width: 24, height:24}}></Image>
        </View>
        </View>

        <View style={{display:'flex', flexDirection:'row', height: 60}}>
        <View style={{flex:1, padding:6, height: 50}}>
        <View style={{display:'flex', flexDirection:'row', height: 40, alignItems: 'center', 
        justifyContent: 'center', marginLeft: 8}}>
        <View style={{padding:6}}>
        <Image source={star} style={{width: 16, height:16}}></Image>
        </View>
        <View style={{padding:6}}>
        <Image source={star} style={{width: 16, height:16}}></Image>
        </View>
        <View style={{padding:6}}>
        <Image source={star} style={{width: 16, height:16}}></Image>
        </View>
        <View style={{padding:6}}>
        <Image source={star} style={{width: 16, height:16}}></Image>
        </View>
        <View style={{padding:6}}>
        <Image source={star} style={{width: 16, height:16}}></Image>
        </View>
        </View>
        </View>
        
        <View style={{flex: 1, padding:6, height: 50, alignItems:'center', 
        justifyContent:'center'}}>
        <Text style={{color:'white', fontSize:7}}>20 personas calificaron a este artista</Text>
        </View>
        </View>

        <View style={{padding:6, height: 60, alignItems:'center', 
        justifyContent:'center'}}>
        <Text style={{color:'white', fontSize:12}}>Descripción</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent:'center', marginTop:10}}>
        <View style={{width: 150, padding:6}}>
        <Button title="VER PERFIL" color="black"></Button>
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