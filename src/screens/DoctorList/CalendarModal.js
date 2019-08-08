import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator, 
    Alert
} from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {styles} from "../../utils/theme";
import {api} from "../../utils/api";

import Modal from 'modal-react-native-web';

export default class CalendarModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showLoading: false,
            chosenDate: new Date(),
            markedDates: [],
            doctor: {},
        }

    }

    disableDays(doctor, schedule) {
        var a = moment();
        var b = moment().add(2, 'months');
        let result = {};


        for (const [key, value] of Object.entries(schedule)) {
            if (value.avaliable) {
                result[key] = {
                    marked: false,
                    dotColor: 'green',
                    selected: true,
                    text: {color: 'black', fontWeight: 'bold'}
                }
            } else {
                result[key] = {disabled: true, disableTouchEvent: true}
            }
        }

        // const workingHours = JSON.parse(doctor.working_hours);
        // const availableDays = Object.keys(workingHours);
        //
        // const validDays = Object.keys(workingHours)
        //     .map((key, index) => {
        //         workingHours[key]["index"] = index;
        //         return workingHours[key];
        //     })
        //     .filter(day => day.start !== "" || day.end !== "")
        //     .reduce((acc = [], val, key) => {
        //         console.log(key, val);
        //         acc.push(availableDays[val.index]);
        //         return acc
        //     }, []);
        //
        // for (let m = moment(a).locale("en"); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
        //     const dayName = m.format('ddd').toLowerCase()
        //
        //     const date = m.format('YYYY-MM-DD');
        //     if (!validDays.includes(dayName)
        //     // || (rangeVacations && m.isBetween(rangeVacations[0], rangeVacations[1], 'days', '[]'))
        //     ) {
        //         result[date] = {disabled: false, disableTouchEvent: true, color: 'blue', marked: true, dotColor: 'red'}
        //     } else {
        //         result[date] = {marked: true, dotColor: 'green', text: {color: 'black', fontWeight: 'bold'}}
        //     }
        //
        // }

        this.setState((state) => ({
            markedDates: {
                ...state.markedDates,
                ...result
            }
        }))
    };

    onDayPress = (date) => {
        const dayName = moment(date, "YYYY-MM-DD").format("ddd").toLowerCase();
        const {doctor} = this.state;
        const {loadSchedule} = this.props;
        const workingHours = doctor.working_hours;
        if (workingHours.hasOwnProperty(dayName) && workingHours[dayName].start !== "") {
            return Alert.alert(
                'Mensaje',
                'Este médico no acepta citas para este día',
                [
                    {text: 'OK', onPress: () => this.showCalendar(key, doctor)},
                ],
                {cancelable: false},
            );
        }
        this.setState({
            modalVisible: false,
            markedDates: [],
        }, () => {console.log(this.props);
            loadSchedule(doctor, date);
            this.props.navigation.navigate("HourInput");
            

        });

        // alert(JSON.stringify(date));
        // this.setState({modalVisible: false});
        // this.props.onDayPress(date)
    };

    open(doctor, center) {

        this.setState({
            doctor,
            center,
            modalVisible: true,
            showLoading: true,
        }, () => {
            this.getCalendarData();
        });


    }

    getCalendarData = (date = null) => {
        let startDate = null;
        if (date) {
            startDate = moment(date.dateString, 'YYYY-MM-DD').startOf('month');
        }

        const {doctor, center} = this.state;


        api.doctor.getCalendarData(doctor.id, center.id, center.center_type, startDate).then(response => {

            this.setState({
                showLoading: false,
            }, () => {
                this.disableDays(doctor, response);

            })

        });

    }

    close = () => {
        this.setState({
            modalVisible: false,
            markedDates: [],
        })
    }


    render() {
        const {doctor, center, showLoading} = this.state;
        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={this.state.modalVisible}
                onRequestClose={this.close}>

                <TouchableWithoutFeedback style={{height: '100%'}}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyItems: 'center',
                            height: '100%',
                            // paddingTop: 12 + 55,
                            backgroundColor: 'white',
                        }}>

                        <View style={{
                            paddingRight: 15,
                            paddingLeft: 15,
                            paddingTop: 10,
                            width: '100%',
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>

                            <TouchableOpacity
                                onPress={() => this.close()}
                                style={[styles.button]}>
                                <Text style={[styles.buttonText]}>Atrás</Text>
                            </TouchableOpacity>

                            <View style={[styles.inline, {
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }]}>
                                <Image
                                    source={{uri: "http://buscamed.do/admin/" + doctor.display_image}}
                                    resizeMode="cover"
                                    style={{width: 80, height: 50, marginRight: 15, borderRadius: 5}}/>
                                <View>
                                    <Text
                                        style={[styles.title, {fontSize: 20}]}>{doctor.doctor_firstname} {doctor.doctor_lastname}</Text>
                                    <Text style={[styles.title, {
                                        color: '#6a6a6a',
                                        fontSize: 16
                                    }]}>{doctor.doctor_experience || doctor.doctor_awards}</Text>
                                </View>
                            </View>
                        </View>


                        {!showLoading && <Calendar
                            style={{
                                flex: 1,
                                padding: 15,
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                                width: '100%',
                            }}
                            onMonthChange={(date) => {
                                this.getCalendarData(date);
                            }}
                            renderArrow={(direction) => (
                                <MaterialCommunityIcons size={50} color="#00ADF7" name={`arrow-${direction}-thick`}/>)}
                            theme={{
                                textSectionTitleColor: 'black',
                                textMonthFontWeight: 'bold',
                                textDayFontSize: 35,
                                textDayFontWeight: 'bold',
                                textMonthFontSize: 30,
                                textDayHeaderFontSize: 25,
                                textDayHeaderColor: 'black',
                                'stylesheet.day.basic': {
                                    'base': {
                                        width: Dimensions.get('window').height / 10,
                                        // height: 52,
                                        height: Dimensions.get('window').height / 10,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    },
                                    'selected': {
                                        backgroundColor: '#84C944',
                                        width: Dimensions.get('window').height / 13,
                                        // height: 52,
                                        height: Dimensions.get('window').height / 13,
                                        borderRadius: Dimensions.get('window').height / 13
                                    },
                                    'dot': {
                                        width: 10,
                                        height: 10,
                                        marginTop: 1,
                                        borderRadius: 5,
                                        opacity: 0
                                    }
                                },
                            }}
                            minDate={new Date()}
                            onDayPress={this.onDayPress}
                            markedDates={{...this.state.markedDates}}
                        />}

                        {showLoading && (
                            <View style={{
                                flex: 1,
                                position: 'absolute',
                                top: 85,
                                right: 0,
                                left: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <ActivityIndicator size="large"/>
                            </View>
                        )}


                        {/*<TouchableOpacity
                            onPress={() => this.setState({
                                modalVisible: false
                            })}
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: 35,
                                borderRadius: 30,
                                // backgroundColor: 'white',
                                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <MaterialCommunityIcons name="close-circle" color={"white"} size={50}/>
                        </TouchableOpacity>*/}

                    </View>

                </TouchableWithoutFeedback>


            </Modal>
        )
    }

}