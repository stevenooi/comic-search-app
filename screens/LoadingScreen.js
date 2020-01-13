import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getState, setState } from 'react-instux';
import axios from 'axios';

const getData = (date) => {
  callQueryAPI();
}
const getAllData = () => {
  getAllAvailableRelease();
}

const sortData = () => {

}

const checkComplete = () => {
  sortData();
}

const searchTopThree = () => {

}

const searchTopTen = () => {
  
}


export default function LoadingScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = React.useState(new Map());
  const [data, setData] = React.useState([]);

  let count = 0;
  let totalCount;
  async function getAvailableRelease() {
    axios.get('https://api.shortboxed.com/comics/v1/releases/available')
    .then(function (response) {
      totalCount =  response.data.length;
      response.data.forEach((obj)=>{
        getDataByReleaseDate(obj);
      });
      // setState(response.data, 'data');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function checkComplete() {
    if(count === totalCount || count > 200) navigation.navigate('Home');
  }

  async function getDataByReleaseDate(date) {
    axios.get(`https://api.shortboxed.com/comics/v1/release_date${date}`)
    .then(function (response) {
      count++;
      const data = getState('data');
      setState(data.concat(response.data.comics), 'data');
      checkComplete();
    })
    .catch(function (error) {
      count++;
      checkComplete();
      console.log(error);
    });
  }

  async function getAllData() {
    axios.get('https://api.shortboxed.com/comics/v1/previous')
    .then(function (response) {
      setState(response.data.comics, 'data');
      navigation.navigate('Home');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function onSelectItem(value) {
    setSearchText(JSON.stringify(value));
    setData([]);
    setState(value, 'selected');
    navigation.navigate('Settings');
  }

  getAllData();
  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.getStartedText}>Starting Up Application ...</Text>
          
        </View>
    </View>
  );
}

LoadingScreen.navigationOptions = {
  title: 'Loading',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    width: '65%',
  },
});
