import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {styles} from '../../utils/theme';

import BuscamedKeyboard from "../../components/BuscamedKeyboard";



function Home(props) {
    
    const {onNextSlide, data, onInfo} = props.screenProps['Home']
    return (
        <View style={styles.slide}>

            <View style={[styles.section, styles.box]}>
            <TouchableOpacity
                    onPress={onInfo}
                    style={[styles.button, { padding: 25}]}>
                    <Text style={[styles.buttonText, {fontSize: 28}]}>Informacion</Text>
                </TouchableOpacity>
                <Image style={{width: '40%', height: '40%'}} resizeMode="contain" source={{uri: 'http://buscamed.do/admin/' +data.display_image}}/>
                <TouchableOpacity
                    onPress={()=>props.navigation.navigate("IdInput")}
                    style={[styles.button, {marginTop: 100, padding: 25}]}>
                    <Text style={[styles.buttonText, {fontSize: 28}]}>Hacer cita médica</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

export default Home;