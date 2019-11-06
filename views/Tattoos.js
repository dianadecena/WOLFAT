import React from 'react';
import { StyleSheet, View, ScrollView, Text, 
ActivityIndicator, Dimensions, FlatList, SafeAreaView } from 'react-native';
import db from '../config';
import Card from './components/Card';

var id, tattoos = [];
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Tattoos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tattoos: [],
      limit: 9,
      lastVisible: null,
      loading: false,
      refreshing: false,
      fontLoaded: false, 
      id,
    };
  }

  _isMounted = false;

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'old-london': require('./assets/fonts/OldLondon.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount = () => {
    try {
      // Cloud Firestore: Initial Query
      this.retrieveData();
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
      await db.firestore().collection('Posts').where('tipo', '==', 1).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          tattoos.push(doc.data().image);
          this.setState({ tattoos, loading: false, })
        });
      });
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
      <ScrollView decelerationRate={'fast'}>
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              tattoos
      </Text>) : null}
        </View>

        <View style={styles.cardContainer}>
        <FlatList
          // Data
          data={this.state.tattoos}
          // Render Items
                    horizontal={false}
          numColumns={2}
          backgroundColor={'#141414'}
          renderItem={({ item }) => (
            <Card imageUri={item} />
          )}
          // Item Key
          keyExtractor={(item, index) => String(index)}
        />
        </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Tattoos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#141414',
    width: null,
    height: null,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 260,
    height: 360,
    borderRadius: 20,
    marginLeft: 5,
    marginBottom: 160,
  }
});