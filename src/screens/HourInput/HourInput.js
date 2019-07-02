import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import {styles} from '../../utils/theme';
import 'moment/locale/es';

import moment from 'moment';




function HourInput(props) {

    const {handleSelectOption, items, doctor, date} = props;


    function renderItem({item}) {
        return (
            <TouchableOpacity
                onPress={()=> handleSelectOption(item)}
                style={[styles.buttonOutline, { padding: 15,}]}>
                <Text style={styles.buttonOutlineText}>{item}</Text>
            </TouchableOpacity>
        )
    }


    const data = [{name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
        {name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
        {name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
        {name: "Ginecobstetra"}, {name: "Cardiólogo"}, {name: "Ginecólogo"},
    ];

    if(!doctor) {
        return (<View/>)
    }
    return (
        <View style={styles.slide}>
            <View style={[styles.section, styles.box,]}>
                <View style={[styles.inline, {width: '100%', justifyContent: 'space-between'}]}>
                    <View
                        style={[styles.inline, {marginLeft: '9%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start'}]}>
                        <Image source={{uri: "http://buscamed.do/admin/" + doctor.display_image}}
                               resizeMode="cover" style={{width: 70, height: 70, marginRight: 15}}/>
                        <View>
                            <Text style={[styles.title, {fontSize: 25}]}>{doctor.doctor_firstname} {doctor.doctor_lastname}</Text>
                            <Text style={[styles.title, {color: '#6a6a6a', fontSize: 20}]}>{doctor.doctor_experience || doctor.doctor_awards}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{fontSize: 24}}>{moment(date, 'YYYY-MM-DD').locale('es').format('MMM DD, YYYY')}</Text>
                    </View>


                </View>

                {items.length === 0 && (
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
                        <Text style={{fontSize: 32}}>Este doctor no acepta citas para este día</Text>
                    </View>
                )}

                {items.length > 0 && (
                    <FlatList
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                        style={{width: '80%',}}
                        data={items}
                        numColumns={3}
                        renderItem={renderItem}
                    />
                )}


            </View>
        </View>

    );
}

export default HourInput;