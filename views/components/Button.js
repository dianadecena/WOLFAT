import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Platform, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends React.Component {



    render() {
        const {
            onPress,
          } = this.props; 
    return (
      
        <View style={[styles.wrapper, {backgroundColor: this.props.background}]}>
        
          
            <TouchableHighlight 
               useForeground={true}
            onPress={onPress}
          >
            <View style={styles.buttonText}>
              <Text style={{color:this.props.color}}>{this.props.text}</Text>
            </View>
            </TouchableHighlight> 
          
         
        </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: 40,
    marginBottom: 15,
    
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    padding: 12,
    paddingBottom: 12,
    alignItems: 'center',
  }
});

