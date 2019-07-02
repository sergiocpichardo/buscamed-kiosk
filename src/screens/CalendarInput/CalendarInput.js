import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image, DatePickerAndroid} from 'react-native';
import {styles} from '../../utils/theme';


class CalendarInput extends React.PureComponent {

    async componentDidMount(): void {
        const {handleSelectOption} = this.props;

        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                handleSelectOption("date");

            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }


    renderItem = ({item}) => {
        const {handleSelectOption} = this.props;

        return (
            <TouchableOpacity
                onPress={() => handleSelectOption(item.id)}
                style={[styles.buttonOutline, {padding: 15,}]}>
                <Text style={styles.buttonOutlineText}>Hora</Text>
            </TouchableOpacity>
        )
    };

    render() {
        const data = [{name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
            {name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
            {name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
            {name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
        ];
        return (
            <View style={styles.slide}>
                <View style={[styles.section, styles.box,{ justifyContent: 'flex-start',
                    alignItems: 'flex-start',}]}>
                    <View style={[styles.inline, {
                        marginLeft: '9%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }]}>
                        <Image
                            source={{uri: "https://ichef.bbci.co.uk/news/660/media/images/76055000/jpg/_76055361_482566485.jpg"}}
                            resizeMode="cover" style={{width: 70, height: 70, marginRight: 15}}/>
                        <View>
                            <Text style={[styles.title, {fontSize: 25}]}>Derek Rogers</Text>
                            <Text style={[styles.title, {color: '#6a6a6a', fontSize: 20}]}>Cardiólogo</Text>
                        </View>

                    </View>



                </View>
            </View>

        );
    }

}

export default CalendarInput;