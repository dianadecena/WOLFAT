import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import bgImage from './assets/background.png';
import { Dimensions } from "react-native";
import Button from './components/Button';
import { withNavigation } from 'react-navigation';

//hay que volarse esta vista

var width = Dimensions.get('window').width;

class Init extends React.Component {

    onSignUp = () => {
      this.props.navigation.navigate('SignUp');
    }

    onLogIn = () => {
      this.props.navigation.navigate('Login');
    }

  state = {
    fontLoaded: false,
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={{marginTop: 60, padding: 20}}> 
      { this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 100, color: '#141414' }}>
              wolfat
            </Text>
          ) : null }
      </View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#E7E7E7', fontSize: 20}}>ARE YOU AN ARTIST OR A CLIENT?</Text>
      </View>
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
      <View onStartShouldSetResponder={() => this.onLogIn()}>
      <Button text="Log In" background="black" color="white" onPress={this.onLogIn} />
      </View>
      <View onStartShouldSetResponder={() => this.onSignUp()}>
      <Button text="SIGN UP" background="white" color="black" onPress={this.onSignUp}/>
      </View>
      </View>
    </ImageBackground>
    );
  }
}

export default withNavigation(Init);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  }
});