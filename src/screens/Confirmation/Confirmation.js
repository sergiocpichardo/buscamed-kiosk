import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {styles} from "../../utils/theme";

function Confirmation(props){
    const {appointment} = props.screenProps['Confirmation'];


    return (
        <View style={[styles.slide]}>

            <View style={[styles.section, styles.box, {justifyContent: 'center'}]}>

                <Text style={[styles.title, {marginBottom: 15}]}>
                   Confirmación de cita
                </Text>

                <Text style={{fontSize: 26, color: '#6a6a6a'}}>Gracias por hacer su cita con nostros.</Text>
                <Text style={{fontSize: 26, color: '#6a6a6a'}}>Su cita está confirmada.</Text>
                <Text style={{fontSize: 26, color: '#6a6a6a'}}>Numero de confirmación {appointment.id}.</Text>
            </View>
        </View>
    )
}

export default Confirmation;