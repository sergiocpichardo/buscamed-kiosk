import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {styles} from "../../utils/theme";

class GenderInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }


    render() {
        const {onNextSlide, handleSelectOption} = this.props;

        return (
            <View style={[styles.slide]}>

                <View style={[styles.section, styles.box, {padding: 30, justifyContent: 'flex-start'}]}>

                    <Text style={styles.title}>
                        Cuál es su sexo?
                    </Text>

                    <View style={[styles.inline, {
                        width: '50%',
                        justifyContent: 'space-between',
                        marginTop: 130,
                        marginBottom: 30
                    }]}>

                        <TouchableOpacity
                            onPress={(text) => handleSelectOption({id: 'male', name: "Hombre"})}>
                            <FontAwesome5 name="male" color="deepskyblue" size={300}/>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={(text) => handleSelectOption({id: 'female', name: "Mujer"})}>
                            <FontAwesome5 name="female" color="deeppink" size={300}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={(text) => handleSelectOption({id: 'male', name: "Hombre"})}
                            style={[styles.button,{backgroundColor: '#184aee', padding: 30, marginBottom: 35,}]}>
                            <Text style={styles.buttonText}>Soy hombre</Text>
                        </TouchableOpacity>*/}

                        {/*<TouchableOpacity
                            onPress={(text) => handleSelectOption({id: 'female', name: "Mujer"})}
                            style={[styles.button,{backgroundColor: '#ea4d89', padding: 30}]}>
                            <Text style={styles.buttonText}>Soy mujer</Text>
                        </TouchableOpacity>*/}
                    </View>

                </View>
            </View>
        )
    }
}

export default GenderInput
