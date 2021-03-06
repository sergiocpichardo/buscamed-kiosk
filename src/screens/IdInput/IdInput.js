import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import BuscamedKeyboard from "../../components/BuscamedKeyboard";

class IdInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    handleKeyPress = (value, removeChar) => {
        const  val = this.props.value || "";
        let finalText = val  + value;
        if(removeChar) {
            finalText = val.substring(0, val.length-1);
        }
        this.props.handleTextChange(finalText)
    };
    noCedula = ()=>{
        // this.props.handleReset(false);
        this.props.noCedula();
        // this.props.scrollTo(1);
        // this.props.onNextSlide();
    }



    render() {
        const {onNextSlide, value, checkId, loading} = this.props;
        const val = value || "";

        return (
            <View style={styles.slide}>

                <View style={[styles.section, styles.box]}>

                    <Text style={styles.title}>
                        Introduzca su número de cédula
                    </Text>

                    <View style={[styles.inline, {marginTop: 10,marginBottom: 15}]}>
                        <TextInput maxLength={3} editable={false} style={[styles.input, {marginRight: 15}]} value={val.substring(0, 3)}/>
                        <TextInput maxLength={7} editable={false} style={[styles.input, {marginRight: 15}]} value={val.substring(3, 10)}/>
                        <TextInput maxLength={1} editable={false} style={[styles.input, {marginRight: 15}]} value={val.substring(10, 11)}/>
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
        minWidth: 240,
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
        padding: 15,
        fontSize: 40,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
        color: '#6a6a6a',
        backgroundColor: '#ececec'
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
});

export default IdInput
