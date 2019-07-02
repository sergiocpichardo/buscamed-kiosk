import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import BuscamedKeyboard from "../../components/BuscamedKeyboard";
import {styles} from "../../utils/theme";


class BloodTypeInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    renderBloodType = ({item}) => {
        const {handleSelectOption} = this.props;
        return (
            <TouchableOpacity
                onPress={() => handleSelectOption(item)}
                style={[styles.buttonOutline, {padding: 15,}]}>
                <Text style={styles.buttonOutlineText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        const data = [
            {id: "1", name: "A+"},
            {id: "2", name: "A-"},
            {id: "3", name: "B+"},
            {id: "4", name: "B-"},
            {id: "5", name: "O+"},
            {id: "6", name: "O-"},
            {id: "7", name: "AB+"},
            {id: "8", name: "AB-"}
        ];

        const {onNextSlide, items} = this.props;

        return (
            <View style={[styles.slide]}>

                <View style={[styles.section, styles.box, {justifyContent: 'center'}]}>

                    <Text style={styles.title}>
                        Cuál es su tipo de sangre?
                    </Text>

                    <FlatList
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                        style={{width: '80%',}}
                        data={items}
                        numColumns={2}
                        renderItem={this.renderBloodType}
                    />
                    <TouchableOpacity
                        onPress={onNextSlide}
                        style={[styles.button, {backgroundColor: '#a3a3a3'}]}>
                        <Text style={styles.buttonText}>No estoy seguro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

export default BloodTypeInput;