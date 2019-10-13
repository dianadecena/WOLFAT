import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button} from 'react-native';

class Profile extends React.Component {

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <View style={{flex: 1}}>
        <Image source={require('./assets/header.jpg')} style={{height: 200}}/>
        <View style={{ marginTop: -50, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('./assets/profile.jpg')} style={{borderRadius: 50, width: 100, height: 100}}/>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', marginTop: 10}}> 
        <Text style={{color:'white'}}>Diana Decena</Text>
        <Text style={{color:'white'}}>Caracas, Venezuela</Text>
        <Text style={{color:'white'}}>Descripción</Text>
        </View>

        <View style={{flex:1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
        <View style={{width: 150}}>
        <Button title="FAVORITO" color="#ccff00"></Button>
        </View>
        <View style={{width: 150}}>
        <Button title="FAVORITO" color="#ccff00"></Button>
        </View>
        </View>

        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
  }
});

