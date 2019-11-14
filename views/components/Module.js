import React from 'react';
import { StyleSheet, View, ScrollView, Text, 
ActivityIndicator, Dimensions, FlatList, SafeAreaView, RefreshControl, LayoutAnimation } from 'react-native';
import db from '../../config';
import Card from './Card';

class Module extends React.Component {

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
      'old-london': require('../assets/fonts/OldLondon.ttf'),
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

      this.unsubscribe = postsRef.where('tipo', '==', this.props.tipo).orderBy("timestamp", "desc").get().then(querySnapshot => {
        var tattoosArray = [];
        querySnapshot.docs.forEach(doc => {
          tattoosArray.push(doc.data());
        });
        that.setState({ loading: false, tattoos: tattoosArray})
      });
    
    }
    catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.backgroundContainer}>
      <ScrollView decelerationRate={'fast'}
      refreshControl={
      <RefreshControl
      refreshing={this.state.loading}
      onRefresh={this.retrieveData}
      />
      }>
        <View style={{ marginTop: 3, marginLeft: 20 }}>
          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'old-london', fontSize: 50, color: 'white' }}>
              {this.props.nombreModulo}
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
            <Card imageUri={item.image} uid={item.uid} timestamp={item.timestamp}/>
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

export default Module;

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