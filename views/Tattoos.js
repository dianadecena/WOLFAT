import React from 'react';
import { StyleSheet, View, ScrollView, Text, 
ActivityIndicator, Dimensions, FlatList, SafeAreaView, RefreshControl, LayoutAnimation } from 'react-native';
import db from '../config';
import Card from './components/Card';

var id;
var users, usersids = [];
var nombre;

class Tattoos extends React.Component {

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      tattoos: [],
      unsubscribe: null,
      limit: 9,
      lastVisible: null,
      loading: false,
      refreshing: false,
      fontLoaded: false
    };
    this.retrieveData = this.retrieveData.bind(this);
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

      const postsRef = db.firestore().collection("Posts");
      const that = this;

      this.unsubscribe = postsRef.where('tipo', '==', 1).get()
      .then(querySnapshot => {
        var tattoosArray = [];
        querySnapshot.docs.forEach(doc => {
          tattoosArray.push(doc.data());
        });
        that.setState({ loading: false, tattoos: tattoosArray })
      });
    
    }
    catch (error) {
      console.log(error);
    }
  };

  retrieveMore = async () => {
    try {
      this.setState({
        refreshing: true,
      });

      const postsRef = db.firestore().collection("Posts");
      const that = this;

      this.unsubscribe = postsRef.where('tipo', '==', 1).limit(this.state.limit).get()
      .then(querySnapshot => {
        var tattoosArray = [];
        querySnapshot.docs.forEach(doc => {
          tattoosArray.push(doc.data());
        });
        let lastVisible = tattoosArray[tattoosArray.length - 1].id;
        that.setState({ tattoos: [...this.state.tattoos, ...tattoosArray], 
        lastVisible: lastVisible, refreshing: false })
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount(){
    this.unsubscribe();
  }

  _onRefresh = () => {
    try {
      this.setState({
        refreshing: true,
      });

      const postsRef = db.firestore().collection("Posts");
      const that = this;

      this.unsubscribe = postsRef.where('tipo', '==', 1).orderBy("timestamp", "desc").get()
      .then(querySnapshot => {
        var tattoosArray = [];
        querySnapshot.docs.forEach(doc => {
          /*if(this.state.tattoos.includes(doc.data())) {
            console.log(doc.data())
            tattoosArray.push(doc.data());
          }*/
          console.log(this.state.tattoos)
        });
        that.setState({ tattoos: tattoosArray, refreshing: false })
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
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.backgroundContainer}>
      <ScrollView decelerationRate={'fast'}
      refreshControl={
      <RefreshControl
      refreshing={this.state.loading}
      onRefresh={this._onRefresh}
      />
      }>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              tattoos
      </Text>) : null}
        </View>

        <View style={styles.cardContainer}> 
        <FlatList
          data={this.state.tattoos}
          horizontal={false}
          numColumns={2}
          backgroundColor={'#141414'}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Card imageUri={item.image} uid={item.uid} timestamp={item.timestamp} />
          )}
          //ListFooterComponent={this.renderFooter}
          //onEndReached={this.retrieveMore}
          onEndReachedThreshold={0}
        />
        </View>
      </ScrollView>
      </SafeAreaView>
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