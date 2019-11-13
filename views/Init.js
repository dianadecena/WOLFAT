import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import bgImage from './assets/background.png';
import { Dimensions } from "react-native";
import Button from './components/Button';
import { withNavigation } from 'react-navigation';
import bg from './assets/init1.jpeg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      <ImageBackground source={bg} style={styles.backgroundContainer}>
        <View style={{ marginTop: hp('10%'), paddingLeft: '10%' }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: hp('18%'), color: '#ccff00', alignItems: 'center' }}>
              wolfat
            </Text>
          ) : null}
        </View>
        <View style={{ marginTop: hp('5%'), alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#ccff00', fontSize: hp('3.5%'), fontWeight: 'bold'}}>WELCOME</Text>
        </View>
        <View style={{marginTop: hp('7.5%'), alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.buttonWrapper} onStartShouldSetResponder={() => this.onLogIn()}>
            <Button text="LOG IN" background="black" color="white" onPress={this.onLogIn} />
          </View>
          <View style={styles.buttonWrapper} onStartShouldSetResponder={() => this.onSignUp()}>
            <Button text="SIGN UP" background="white" color="black" onPress={this.onSignUp} />
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
  },
  buttonWrapper: {
    overflow: 'hidden',
    marginBottom: hp('1%'),
    height: hp('15%'),
    width: wp('70%'),
  },
});