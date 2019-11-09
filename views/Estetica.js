import React from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView, FlatList } from 'react-native';
import db from '../config';
import Card from './components/Card';

var estetica = [];

class Estetica extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      estetica: [],
      loading: false,
      refreshing: false,
      fontLoaded: false, 
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount = async () => {
    try {
      // Cloud Firestore: Initial Query
      await this.retrieveData();
    }
    catch (error) {
      console.log(error);
    }
  };

  retrieveData = async () => {
    try {
      this.setState({
        loading: true,
      });
     
    await db.firestore().collection('Posts').where('tipo', '==', 2).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          estetica.push(doc.data());
          this.setState({ estetica })
        });
      })
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    /*if(!this.state.loading){
      return(
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
        </View>
      );
    }*/

    return (
      <SafeAreaView style={styles.backgroundContainer}>
      <ScrollView decelerationRate={'fast'}>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              hair
      </Text>) : null}
        </View>

        <View style={styles.cardContainer}> 
        <FlatList
          data={this.state.estetica}
          horizontal={false}
          numColumns={2}
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          backgroundColor={'#141414'}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Card imageUri={item.image} uid={item.uid}/>
          )}
        />
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Estetica;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

