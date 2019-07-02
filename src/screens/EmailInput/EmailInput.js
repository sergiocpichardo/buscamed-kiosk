import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from '../../utils/theme'

class EmailInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    focusInput =() =>  {
        this.emailInput.focus();
    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const {onNextSlide, handleTextChange, value} = this.props;

        return (
            <View style={[styles.slide]}>

                <View style={[styles.section, styles.box, {
                    alignItems: 'flex-start',
                    padding: 30,
                    justifyContent: 'flex-start'
                }]}>

                    <Text style={styles.title}>
                        Introduzca su correo electrónico
                    </Text>

                    <View style={[styles.inline, {marginTop: 10, marginBottom: 30}]}>
                        <TextInput
                            ref={ref => {this.emailInput = ref}}
                            value={value}
                            onChangeText={(text) => handleTextChange(text)}
                            style={[styles.input, {width: '100%'}]}/>
                    </View>

                    <View style={[styles.spaceBetween, {width: '100%'}]}>
                        <TouchableOpacity
                            onPress={onNextSlide}
                            style={[styles.button, {backgroundColor: '#a3a3a3'}]}>
                            <Text style={[styles.buttonText]}>No tengo correo electrónico</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={!this.validateEmail(value)}
                            onPress={onNextSlide}
                            style={[styles.button]}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        )
    }

}

export default EmailInput;

