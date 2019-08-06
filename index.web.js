// import App from './App.web';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/utils/navigator/navigator';
// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
});