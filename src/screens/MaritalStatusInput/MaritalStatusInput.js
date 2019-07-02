import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from "../../utils/theme";

class MaritalStatusInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }


    render() {
        const {handleSelectOption} = this.props;

        return (
            <View style={[styles.slide]}>

                <View style={[styles.section, styles.box, { padding: 30,  justifyContent: 'flex-start'}]}>

                    <Text style={styles.title}>
                        Cuál es su estado civil?
                    </Text>

                    <View style={[{width: '80%', flexDirection: 'row',  marginTop: 130, marginBottom: 30}]}>
                        <TouchableOpacity
                            onPress={()=>handleSelectOption({id: "1", name: "Soltero"})}
                            style={[styles.buttonOutline,]}>
                            <Text style={styles.buttonOutlineText}>Soltero</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>handleSelectOption({id: "2", name: "Casado"})}
                            style={[styles.buttonOutline,]}>
                            <Text style={styles.buttonOutlineText}>Casado</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

export default MaritalStatusInput
