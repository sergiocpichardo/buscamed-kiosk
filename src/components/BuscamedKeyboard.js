import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

function BuscamedKeyboard({onKeyPressed}) {

    return (
        <View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => onKeyPressed("1")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("2")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>2</Text>
                    <Text style={styles.keyColor}>ABC</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("3")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>3</Text>
                    <Text style={styles.keyColor}>DEF</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => onKeyPressed("4")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>4</Text>
                    <Text style={styles.keyColor}>GHI</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("5")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>5</Text>
                    <Text style={styles.keyColor}>JKL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("6")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>6</Text>
                    <Text style={styles.keyColor}>MNO</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => onKeyPressed("7")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>7</Text>
                    <Text style={styles.keyColor}>PQRS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("8")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>8</Text>
                    <Text style={styles.keyColor}>TUV</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("9")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>9</Text>
                    <Text style={styles.keyColor}>WXYZ</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>

                <View style={[styles.button, {backgroundColor: '#FFF'}]}>
                    <Text></Text>
                    <Text></Text>
                </View>

                <TouchableOpacity
                    onPress={() => onKeyPressed("0")}
                    style={styles.button}>
                    <Text style={[styles.keyColor, styles.number]}>0</Text>
                    {/*<Text></Text>*/}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onKeyPressed("", true)}
                    style={[styles.button, {backgroundColor: '#FFF'}]}>
                    <Image style={{width: 160, height: 35}} resizeMode="contain"
                           source={require('../../assets/delete.png')}/>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    keyColor: {
        color: '#FFF'
    },
    number: {
        fontSize: 25
    },

    row: {
        flexDirection: 'row'
    },

    button: {
        borderRadius: 5,
        minWidth: 180,
        // minHeight: 100,
        margin: 5,

       padding: 25,
        // padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0276a1'
    },


});

export default BuscamedKeyboard;