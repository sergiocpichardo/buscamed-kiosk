import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { createSwitchNavigator } from '@react-navigation/core';
import { createBrowserApp } from "@react-navigation/web";
import Home from '../../screens/Home/';
import IdInput from '../../screens/IdInput/';
import App from '../../../App.web';
import NameInput from '../../screens/NameInput';




const MainNavigator = createSwitchNavigator({
    App:App
})


export default createBrowserApp(MainNavigator);