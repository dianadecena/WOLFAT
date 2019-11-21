import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import {Icon,Container,Header, Content} from 'native-base'

class LikedImages extends Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                    <Text>LikedImages</Text>
                </Content>
            </Container>
        );
    }
}
export default LikedImages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});