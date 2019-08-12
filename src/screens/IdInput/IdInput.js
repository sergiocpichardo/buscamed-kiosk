import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import BuscamedKeyboard from "../../components/BuscamedKeyboard";

const {height, width} = Dimensions.get("screen");


class IdInput extends PureComponent {

    
    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    handleKeyPress = (value, removeChar) => {
    
        const  val = this.props.screenProps['IdInput'].value;
        if(this.props.screenProps['IdInput'].value.length<11){
            const  val = this.props.screenProps['IdInput'].value;
            var finalText = val  + value;
            this.props.screenProps['IdInput'].handleTextChange(finalText)
        }
        if(removeChar) {
            finalText = val.substring(0, val.length-1);
            this.props.screenProps['IdInput'].handleTextChange(finalText)
        }
        
    };
    noCedula = ()=>{
        // this.props.handleReset(false);
        this.props.screenProps['IdInput'].noCedula();
        // this.props.noCedula();
        // this.props.scrollTo(1);
        // this.props.onNextSlide();
    }



    render() {
        console.log("idinput props", this.props);
        const {onNextSlide, value, checkId, loading} = this.props.screenProps['IdInput'];
        // const val = this.props.navigation.getParam('value',"");
         
        const val = value;
        return (
            <View style={styles.slide}>

                <View style={[styles.section, styles.box]}>

                    <Text style={styles.title}>
                        Introduzca su número de cédula
                    </Text>

                    <View style={[styles.inline, {marginTop: 10,marginBottom: 15}]}>
                        <TextInput maxLength={3} editable={false} style={[styles.input, {marginRight: 15}]} value={val.substring(0, 3)}/>
                        <TextInput maxLength={7} editable={false} style={[styles.input, {marginRight: 15}]} value={val.substring(3, 10)}/>
                        <TextInput maxLength={1} editable={false} style={[styles.input]} value={val.substring(10, 11)}/>
                    </View>

                    <BuscamedKeyboard onKeyPressed={(value, removeChar) => this.handleKeyPress(value, removeChar)}/>


                    <View style={[styles.spaceBetween, {marginTop: 15}]}>
                        <TouchableOpacity
                            onPress={this.noCedula}
                            style={[styles.button, {backgroundColor: '#a3a3a3'}]}>
                            <Text style={styles.buttonText}>No tengo cédula</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={value.length < 11}
                            onPress={checkId}
                            style={styles.button}>
                            {loading ? <ActivityIndicator/> : <Text style={styles.buttonText}>Continuar</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    button: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#88c84c',
        // minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },

    box: {
        flex: 1,
        // padding: 13,
        margin: '5%',
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

    input: {
     
        textAlign:'center',
        // padding: 1,
        // minWidth:width*0.1,
        // maxWidth:width*0.2,
        width:'20%',
        fontSize: 30,
        // paddingLeft: 4,
        // paddingRight: 4,
        fontWeight: 'bold',
        color: '#6a6a6a',
        backgroundColor: '#ececec'
    },

    inline: {
        flexDirection: 'row',

        justifyContent:'center',
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
});

export default IdInput
