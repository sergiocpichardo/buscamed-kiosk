import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { createSwitchNavigator, createAppContainer } from '@react-navigation/core';
import { createBrowserApp } from "@react-navigation/web";
import Home from '../../screens/Home/';
import IdInput from '../../screens/IdInput/';
import App from '../../../App.web';
import NameInput from '../../screens/NameInput';




const MainNavigator = createSwitchNavigator({
    App:{screen:App, path:''}
})


export default createBrowserApp(MainNavigator);