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
import Item from '../components/Item';

const getAllAvailableRelease = () => {

}
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

export default function HomeScreen({ navigation }) {
  const [helpTextDisplay, setHelpTextDisplay] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = React.useState(new Map());
  const [data, setData] = React.useState([]);
  function onChangeText(value) {
    setHelpTextDisplay(false);
    if(value && value.length > 2) {
      const arr1 = getState('data').filter(d => d.title.includes(value)).slice(0, 3);
      setData(arr1);
    }
  }

  function onSubmit() {
    const arr1 = getState('data').filter(d => d.title.includes(searchText)).slice(0, 10);
    setData(arr1);
  }
  
  function onSelectItem(value) {
    setSearchText(value.title);
    setData([]);
    setState(value, 'selected');
    navigation.navigate('Settings');
  }
  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Search</Text>
          <TextInput
            style={{ height: 30, width: '100%', borderColor: 'gray', borderWidth: 1, textAlign: 'center' }}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              onChangeText(text);
            }}
            onSubmitEditing={() => onSubmit()}
          />
          { 
            helpTextDisplay && <View style={styles.helpContainer}>
                                <Text style={styles.getStartedText}>
                                    start typing to search for a comic
                                </Text>
                              </View>
          }
          <FlatList
            data={data}
            renderItem={({ item }) => 
              <Item
                id={item.id}
                title={item.title}
                selected={!!selected.get(item.id)}
                onSelect={() => onSelectItem(item)}
                key={Math.random()*10000}
              />
            }
            keyExtractor={item => item.id}
            style={styles.flatList}
          />
        </View>

    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Search',
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    paddingTop: 20,
    alignItems: 'center',
    marginHorizontal: 50,
    height: '50%',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    width: '65%',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  listItem: {
    padding: 10,
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: '#d3d3d3',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  flatList: {
    width: '100%',
  },
});
