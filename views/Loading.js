import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import firebase from 'firebase';

class Loading extends Component {

    componentDidMount(){
        this.isLoggedIn();
    }

    isLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                this.props.navigation.navigate('Dashboard');
            }
            else{
                this.props.navigation.navigate('Home');
            }
        }.bind(this))
    }


    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        );
    }
}
export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});