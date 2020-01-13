import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { getState, setState } from 'react-instux';

export default function DetailsScreen() {
  const [searchText, setSearchText] = useState();
  const selectedData = getState('selected') || {};

  return (
  <View style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
     

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedData.title}</Text>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.description} ellipsizeMode='tail' numberOfLines={6}>{selectedData.description}</Text>
      </View>
      
      <View style={styles.labelContainer}>
        <Text style={styles.description}>Price: ${selectedData.price}</Text>
      </View>
      
      <View style={styles.labelContainer}>
        <Text style={styles.description}>Publisher: {selectedData.publisher}</Text>
      </View>
      
      <View style={styles.labelContainer}>
        <Text style={styles.description}>Release Date: {JSON.stringify(selectedData.releaseDate)}</Text>
      </View>
    </ScrollView>
  </View>);
}

DetailsScreen.navigationOptions = ({ navigation }) => ({
  title: getState('selected') ? getState('selected').title : '',
  headerLeft: (<HeaderBackButton title='Back' onPress={ () => navigation.navigate('Home')} backTitleVisible={true}  />),
});

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    width: '80%',
  },
  titleContainer: {
    height: 50,
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  labelContainer: {
    marginTop: 10,
    height: '10%',
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 20,
  },
  listItem: {
    padding: 10,
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: '#d3d3d3',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    // borderWidth: 1,
    // borderLeftStyle: 'solid',
    // borderRightStyle: 'solid',
    // borderBottomStyle: 'solid',
  },
  flatList: {
    width: '100%',
  },
});
