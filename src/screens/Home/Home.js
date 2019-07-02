import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {styles} from '../../utils/theme';

import BuscamedKeyboard from "../../components/BuscamedKeyboard";

function Home({onNextSlide, data}) {
    return (
        <View style={styles.slide}>

            <View style={[styles.section, styles.box]}>
                <Image style={{width: '40%', height: '40%'}} resizeMode="contain" source={{uri: 'http://buscamed.do/admin/' +data.display_image}}/>
                <TouchableOpacity
                    onPress={onNextSlide}
                    style={[styles.button, {marginTop: 100, padding: 25, minWidth: 300}]}>
                    <Text style={[styles.buttonText, {fontSize: 28}]}>Hacer cita médica</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

export default Home;