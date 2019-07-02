import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from '../../utils/theme'

class LastNameInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    focusInput =() =>  {
        this.lastName.focus();
    };

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
                        Introduzca su apellido
                    </Text>

                    <View style={[styles.inline, {marginTop: 10, marginBottom: 30}]}>
                        <TextInput
                            ref={ref => {this.lastName = ref}}
                            value={value}
                            onChangeText={(text) => handleTextChange(text)}
                            style={[styles.input, {width: '100%'}]}
                        />
                    </View>

                    <TouchableOpacity
                        disabled={value.length < 3}
                        onPress={onNextSlide}
                        style={[styles.button, {alignSelf: 'flex-end'}]}>
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default LastNameInput;

