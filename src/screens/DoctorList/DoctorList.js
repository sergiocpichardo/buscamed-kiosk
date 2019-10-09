import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import BuscamedKeyboard from "../../components/BuscamedKeyboard";
import {styles} from "../../utils/theme";
import CalendarModal from './CalendarModal';


class DoctorList extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: "",
            showCalendar:false,
        }
    }

    renderItem = ({item, index}) => {

        // alert(JSON.stringify(props))
        const {center} = this.props.screenProps['DoctorList'];
        const offset = index % 2 === 0 ? {marginRight: 15} : {marginLeft: 200};

        return (
            <TouchableOpacity
                onPress={()=> {this.setState({showCalendar:true},()=>this.calendar.open(item, center))}}
                style={[styles.inline, {margin: 15, flex: 1}]}>
                <Image
                    source={item.display_image===""||item.display_image==null?require("../../../assets/Artboard.png"):{uri: "https://buscamed.do/admin/" + item.display_image}}
                    resizeMode='contain'
                    style={{width: 140, height: 110, marginRight: 15, borderRadius: 5}}/>
                <View>
                    <Text style={[styles.title, {fontSize: 25}]}>{item.doctor_firstname} {item.doctor_lastname}</Text>
                    <Text style={[styles.title, {color: '#6a6a6a', fontSize: 20}]}>{item.doctor_experience || item.doctor_awards}</Text>
                </View>

            </TouchableOpacity>

        )

    }


    render() {
        const {onNextSlide, items, speciality, loading, loadSchedule} = this.props.screenProps['DoctorList'];
        return (
            <View style={styles.slide}>
                <View style={[styles.section, styles.box, {
                    alignItems: 'flex-start',
                    padding: 30,
                    justifyContent: 'flex-start'
                }]}>
                    <Text style={styles.title}>
                        {speciality.name}
                    </Text>

                    <Text style={{fontSize: 30, color: '#6a6a6a', fontWeight: 'bold'}}>
                        Seleccione el doctor
                    </Text>


                    <View style={{width: '100%', flex:1, alignItems: 'center'}}>
                        {loading?  (
                            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                                <Text style={{fontSize: 24, marginBottom: 15}}>Por favor espere</Text>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ): (
                            <FlatList
                                contentContainerStyle={{flexGrow: 1,   }}
                                style={{  width: '100%', marginTop: 15 }}
                                data={items}
                                numColumns={2}
                                renderItem={this.renderItem}
                            />
                        )}

                    </View>



                </View>
                {this.state.showCalendar?<CalendarModal navigation={this.props.navigation} loadSchedule={loadSchedule} ref={(ref) => this.calendar = ref}/>:null}
            </View>
        );
    }
}

export default DoctorList;