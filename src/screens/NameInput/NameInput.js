import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
// import {styles} from '../../utils/theme'

const {height, width} = Dimensions.get("screen");

class NameInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    focusInput =() =>  {
        this.nameInput.focus();
    };


    render() {
        
        const {onNextSlide, handleTextChange, value} = this.props.screenProps['NameInput'];
// console.log("Value",this.props);
        return (
                <View style={[styles.slide]}>

                    <View style={[styles.section, styles.box, {alignItems: 'flex-start', padding: 30,  justifyContent: 'flex-start'}]}>

                        <Text style={styles.title}>
                            Introduzca su primer nombre
                        </Text>

                        <View style={[styles.inline, {marginTop: 10, marginBottom: 30}]}>
                            <TextInput
                                ref={ref => {this.nameInput = ref}}
                                value={value}
                                onChangeText={(text) => handleTextChange(text)}
                                style={[styles.input, {width: width/2, height:'100%'}]}
                                autoCorrect={false}
                                />
                        </View>

                            <TouchableOpacity
                                disabled={value.length < 3}
                                onPress={()=>this.props.navigation.navigate('LastNameInput')}
                                style={[styles.button, {alignSelf: 'flex-end'}]}>
                                <Text style={styles.buttonText}>Continuar</Text>
                            </TouchableOpacity>
                    </View>
                </View>
        )
    }

}

const styles= StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },

    modalTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        // textAlign: 'center'
    },

    modalMessage: {
        fontSize: 22,
    },

    modalBody: {
        borderRadius: 5,

        width: '70%',
        padding: 20,
        backgroundColor: 'white'
    },

    alertButton: {
      padding: 15,
    },

    alertButtonText: {
        color: '#15A397',
      fontSize: 22,
    },

    buttons: {
      justifyContent: 'flex-end'
    },

    button: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#88c84c',
        minWidth: 240,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonOutline: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 15,
        borderColor: '#0276a1',
        borderWidth: 3,

    },

    buttonOutlineText: {
      color: '#0276a1',
        fontSize: 25,
        fontWeight: 'bold'
    },

    buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },

    box: {
        flex: 1,
        padding: 13,
        margin: 85,
        borderRadius: 10,
        elevation: 6,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },



        shadowRadius: 5,
        shadowOpacity: .1,
        backgroundColor: '#FFF',

        // borderColor: '#ddd',
        // // borderBottomWidth: 0,
        // shadowColor: '#000',
        // shadowOffset: { width: 2, height: 2 },
        // // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // borderWidth: 1,
        // backgroundColor: '#000000',
        // opacity: 0.08
    },
    slide: {
        flex: 1,
       height:height*0.2
    },

    spaceBetween: {
        // flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    title: {
        color: '#0276a1',
        fontSize: 36,
        fontWeight: '600'
    },

    section: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

  

    inline: {
        flexDirection: 'row'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
     
        textAlign:'center',
        // padding: 1,
        // minWidth:width*0.1,
        // maxWidth:width*0.2,
        width:'20%',
        fontSize: 40,
        // paddingLeft: 4,
        // paddingRight: 4,
        fontWeight: 'bold',
        color: '#6a6a6a',
        backgroundColor: '#ececec'
    },
});


export default NameInput;

