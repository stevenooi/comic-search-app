import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoadingScreen from '../screens/LoadingScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const tabNavigator = createStackNavigator({
  Loading: LoadingScreen,
  Home: HomeScreen,
  Settings: DetailsScreen,
  Loading: LoadingScreen,
}, config);

tabNavigator.path = '';

export default tabNavigator;
