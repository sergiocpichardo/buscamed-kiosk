/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {configureLocale} from './src/utils/configureLocale';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    DatePickerAndroid,
    ScrollView,
    ActivityIndicator,
    Alert,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import IdInput from './src/screens/IdInput';
import PhoneInput from './src/screens/PhoneInput';
import NameInput from './src/screens/NameInput';
import LastNameInput from './src/screens/LastNameInput';
import MaritalStatusInput from './src/screens/MaritalStatusInput';
import GenderInput from './src/screens/GenderInput';
import EmailInput from './src/screens/EmailInput';
import BloodTypeInput from './src/screens/BloodTypeInput';
import SpecialityInput from './src/screens/SpecialityInput';
import DoctorList from './src/screens/DoctorList';
import Home from './src/screens/Home';
import HourInput from './src/screens/HourInput';
import Confirmation from './src/screens/Confirmation';
import PromptAppointment from './src/screens/PromptAppointment';
import PhotoTake from './src/screens/PhotoTake';
import CalendarInput from './src/screens/CalendarInput';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import UserInactivity from 'react-native-user-inactivity';


import {api} from './src/utils/api';
const {height, width} = Dimensions.get("window");
type Props = {};
const defaultState = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    patient: {
        display_name: 'assets/uploads/doctor/Dr-Victor-Garcia-Garcia.jpg'
    },

    picture: {},

    index: 0,
    doctors: [],
    doctorSchedule: [],

    speciality: {},
    doctor: {},
    gender: {},
    maritalStatus: {},
    bloodType: {},
    doctorListLoading: false,
    confirmationLoading: false,
    idCheckLoading: false,
    appointment: {},

    center: {},
    centerId: 468,
    centerType: 5,
    userType: 0,
    bloodTypes: [],
    specialities: [],

    gettingData: true,
    error: false,
};

export default class App extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = defaultState;

        this.swiper = null;
        this.currentIndex = 1;
    }

    componentDidMount(): void {
        this.getDeviceInfo();
        configureLocale('es');
    }

    getDeviceInfo = () => {
        const id = DeviceInfo.getUniqueID();
        // alert(DeviceInfo.getUniqueID());
        console.log("deviceUniqueId", DeviceInfo.getUniqueID());
        this.setState({gettingData: true,})

        api.center.getDeviceInfo(id).then(response => {
            const data = response.data;
            if (response.exists) {
                this.setState({
                    center: data,
                    centerId: data.id,
                    centerType: data.center_type,
                    userType: data.user_type,
                    gettingData: false,
                    error: false,
                }, () => {
                    const {centerId, centerType, userType} = this.state;
                    api.general.getBloodGroups().then(response => {
                        this.setState({bloodTypes: response})
                    });

                    api.center.getSpecialities(centerId, userType).then(response => {
                        this.setState({specialities: response.data})
                    }).catch(error => {
                        alert(JSON.stringify(error, undefined, 5));
                    })
                })
            } else {
                this.setState({
                    error: true,
                    gettingData: false
                })
            }

        }).catch((error) => {
            this.setState({
                error: true,
                gettingData: false
            })
        });
    }

    checkId = () => {
        this.setState({
            idCheckLoading: true
        }, () => {
            api.patient.getPatientByIdNumber(this.state.id).then(response => {
                const patient = response.patient;

                if (patient) {
                    this.setState({
                        patient,
                        idCheckLoading: false,
                        firstName: patient.patient_firstname,
                        lastName: patient.patient_lastname,
                        email: patient.email,
                        phone: patient.phone,
                    }, () => {
                        this.handleNextSlide();
                    });
                } else {
                    this.setState({
                        idCheckLoading: false,
                    }, () => {
                        this.handleNextSlide();
                    })
                }
                setTimeout(() => {
                    this.nameInput.focusInput();
                }, 500)
            });
        });

    };

    getDoctors = (specialityId) => {
        const {centerId, centerType, userType} = this.state;
        this.setState({
            doctorListLoading: true
        }, () => {
            api.center.getDoctorsBySpeciality(centerId, userType, specialityId).then(response => {
                this.setState({
                    doctorListLoading: false,
                    doctors: response.data
                })
            })
        });

    };

    makeAppointment = () => {
        this.setState({
            confirmationLoading: true
        }, () => {
            api.appointment.saveAndCreatePatient(this.state).then(response => {
                this.setState({
                    appointment: response.data,
                    confirmationLoading: false
                }, () => {

                    this.handleNextSlide();
                    setTimeout(() => {
                        this.handleResetForm(false);
                    }, 10000)
                })
            }).catch(error => {
            })
        });
    };

    handleNextSlide = (field) => {
        this.currentIndex = 1 + this.currentIndex;
        const currentIndex = this.swiper.state.index;
        const offset = this.currentIndex - currentIndex;
        if (this.currentIndex <= 2) {
            this.swiper.scrollBy(this.currentIndex - 1);
        } else {
            this.swiper.scrollBy(offset - 1);
        }

        if (field === "id") {
            setTimeout(() => {
                this.nameInput.focusInput();
            }, 500)
        }

        if (field === "fistName") {
            setTimeout(() => {
                this.lastNameInput.focusInput();

            }, 500)
        }

        if (field === "lastName") {
            setTimeout(() => {
                this.emailInput.focusInput();

            }, 500)
        }
        // this.swiper.scrollBy(offset);
    };

    handleTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    loadSchedule = (doctor, date) => {
        this.setState({
            doctorId: doctor.id,
            doctor: doctor,
            date: date.dateString
        }, () => {
            const {centerId, centerType} = this.state;
            api.doctor.getSchedule(doctor.id, centerId, centerType, date.dateString).then(response => {
                // alert(JSON.stringify(response));
                this.setState({
                    doctorSchedule: response.avaliable_hours_formathi_a
                }, () => this.handleNextSlide())
            }).catch(error => alert(error));
        });
    }

    showCalendar = async (key, doctor) => {
        try {
            const minDate = new Date();

            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: minDate,
                minDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = moment(`${year}-${month + 1}-${day}`, "YYYY-M-D").format("YYYY-MM-DD");
                const dayName = moment(date, "YYYY-MM-DD").format("ddd").toLowerCase();
                const workingHours = JSON.parse(doctor.working_hours);

                // alert(JSON.stringify(doctor.working_hours, undefined, 2))
                if (workingHours.hasOwnProperty(dayName) && workingHours[dayName].start !== "") {
                    this.setState({
                        doctorId: doctor.id,
                        doctor: doctor,
                        date
                    }, () => {
                        const {centerId, centerType} = this.state;
                        api.doctor.getSchedule(doctor.id, centerId, centerType, date).then(response => {
                            // alert(JSON.stringify(response));
                            this.setState({
                                doctorSchedule: response.avaliable_hours_formathi_a
                            }, () => this.handleNextSlide())
                        }).catch(error => alert(error));
                    });
                } else {
                    Alert.alert(
                        'Mensaje',
                        'Este médico no acepta citas para este día',
                        [
                            {text: 'OK', onPress: () => this.showCalendar(key, doctor)},
                        ],
                        {cancelable: false},
                    );
                }

                // Selected year, month (0-11), day


            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    handleSelectOption = (key, value) => {

        if (key === 'speciality') {
            this.getDoctors(value.id);
        }


        this.setState({
            [key]: value
        }, () => {
            this.currentIndex = 1 + this.currentIndex;
            const currentIndex = this.swiper.state.index;
            const offset = this.currentIndex - currentIndex;
            if (this.currentIndex <= 2) {
                this.swiper.scrollBy(this.currentIndex - 1);
            } else {
                this.swiper.scrollBy(offset - 1);
            }
        })
    };

    handleResetForm = (prompt = true) => {

        const callback = () => {
            const {bloodTypes, specialities, center, centerId, centerType, userType} = this.state;
            this.setState({
                ...defaultState,
                bloodTypes,
                specialities,

                gettingData: false,
                center,
                centerId,
                centerType,
                userType
            });

            this.currentIndex = 0;
            const currentIndex = this.swiper.state.index;
            const offset = this.currentIndex - currentIndex;
            this.swiper.scrollBy(offset);
            if (this.photoTake) {
                this.photoTake.reset();
            }
        };

        if (prompt) {
            Alert.alert(
                'Esta seguro?',
                'Los datos suministrados hasta el momento serán removidos',
                [
                    {
                        text: 'Cancelar'
                    },
                    {
                        text: 'OK', onPress: () => {
                            callback();
                        }
                    },
                ],
                {cancelable: false},
            );
        } else {
            callback();
        }


    };

    setPicture = (picture) => {
        this.setState({
            picture
        }, () => {
            this.handleNextSlide()
        })
    }

    handleBack = () => {
        const currentIndex = this.swiper.state.index;
        const offset = (this.currentIndex - 2) - currentIndex;
        this.swiper.scrollBy(offset);
    };

    onAction = (active) => {
       console.log("is active",active);
       if(!active &&  this.currentIndex > 1 ) {
          this.handleResetForm(false);
       }
    };

    render() {
        // alert(this.currentIndex);

        const {gettingData, error, index, bloodTypes, specialities, doctors, doctorSchedule, doctor, speciality, confirmationLoading, doctorListLoading, idCheckLoading, appointment, date, patient, center} = this.state;

        if (gettingData) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 40, marginBottom: 15}}>Configurando dispositivo</Text>
                    <ActivityIndicator size="large"/>

                </View>
            )
        }

        if (error) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 15}}>
                    <Text style={{fontSize: 35, textAlign: 'center', marginBottom: 30}}>Error al configurar el
                        dispositivo, por favor revise su conexión a internet y que el dispositivo esté asociado a su
                        centro </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.getDeviceInfo}>
                        <Text style={styles.buttonText}>Intentar nuevamente</Text>
                    </TouchableOpacity>

                </View>
            )

        }

        return (
            <UserInactivity
                timeForInactivity={120000}
                onAction={this.onAction}
            >
                <View style={{flex: 1, height:height, width:width}}>
                    <Image style={{position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, height: '100%'}}
                            source={require('./assets/background.png')}/>
                    <Swiper
                        keyboardDismissMode='on-drag'
                        ref={(ref) => this.swiper = ref}
                        showsPagination={false}
                        scrollEnabled={false}
                        index={index}
                        onIndexChanged={(index) => {
                            this.currentIndex = index + 1;
                            this.setState({currentIndex: this.currentIndex})
                        }}
                        style={[styles.wrapper]}
                        showsButtons={false}>


                        {/*<CalendarInput
                        handleSelectOption={(text) => this.handleSelectOption("date", text)}/>*/}
                        <Home data={this.state.center} onNextSlide={this.handleNextSlide}/>
                        <IdInput
                            loading={idCheckLoading}
                            value={this.state.id}
                            checkId={this.checkId}
                            handleTextChange={(text) => this.handleTextChange("id", text)}
                            onNextSlide={() => this.handleNextSlide("id")}/>

                        <NameInput
                            ref={(ref) => {
                                this.nameInput = ref
                            }}
                            value={this.state.firstName}
                            handleTextChange={(text) => this.handleTextChange("firstName", text)}
                            onNextSlide={() => this.handleNextSlide("fistName")}/>

                        <LastNameInput
                            ref={(ref) => {
                                this.lastNameInput = ref
                            }}
                            value={this.state.lastName}
                            autoFocus={true}
                            handleTextChange={(text) => this.handleTextChange("lastName", text)}
                            onNextSlide={() => this.handleNextSlide("lastName")}/>


                        <EmailInput
                            ref={(ref) => {
                                this.emailInput = ref
                            }}
                            value={this.state.email}
                            handleTextChange={(text) => this.handleTextChange("email", text)}
                            onNextSlide={() => this.handleNextSlide("email")}/>

                        <GenderInput
                            value={this.state.gender}
                            handleSelectOption={(text) => this.handleSelectOption("gender", text)}
                            onNextSlide={() => this.handleNextSlide("gender")}/>

                        <PhoneInput
                            value={this.state.phone}
                            handleTextChange={(text) => this.handleTextChange("phone", text)}
                            onNextSlide={() => this.handleNextSlide("phone")}/>

                        <MaritalStatusInput
                            value={this.state.maritalStatus}
                            handleSelectOption={(text) => this.handleSelectOption("maritalStatus", text)}
                            onNextSlide={() => this.handleNextSlide("maritalStatus")}/>

                        <BloodTypeInput
                            value={this.state.bloodType}
                            items={bloodTypes}
                            handleSelectOption={(text) => this.handleSelectOption("bloodType", text)}
                            onNextSlide={() => this.handleNextSlide("bloodType")}/>

                        <PhotoTake
                            ref={(ref) => {
                                this.photoTake = ref;
                            }}
                            setPicture={this.setPicture}
                        />

                        <SpecialityInput
                            items={specialities}
                            value={this.state.speciality}
                            handleSelectOption={(text) => this.handleSelectOption("speciality", text)}
                            onNextSlide={() => this.handleNextSlide("speciality")}/>

                        <DoctorList
                            loadSchedule={this.loadSchedule}
                            loading={doctorListLoading}
                            speciality={speciality}
                            center={center}
                            items={doctors}
                            showCalendar={(text) => this.showCalendar("doctorId", text)}
                            onNextSlide={() => this.handleNextSlide("")}/>

                        <HourInput
                            date={date}
                            doctor={doctor}
                            items={doctorSchedule || []}
                            handleSelectOption={(text) => this.handleSelectOption("hour", text)}
                        />

                        <PromptAppointment
                            resetForm={this.handleResetForm}
                            form={this.state}
                            loading={confirmationLoading}
                            createAppointment={this.makeAppointment}/>


                        <Confirmation
                            appointment={appointment}
                        />

                    </Swiper>

                    <View style={[styles.inline, {}]}>
                        {/*<TouchableOpacity*/}
                        {/*onPress={this.handleResetForm}*/}
                        {/*style={[styles.button, {*/}
                        {/*alignSelf: 'center',*/}
                        {/*position: 'absolute',*/}
                        {/*bottom: 5,*/}
                        {/*left: '30%',*/}
                        {/*right: '30%'*/}
                        {/*}]}>*/}
                        {/*<Text style={styles.buttonText}>Volver al inicio</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {this.currentIndex !== 1 && (
                            <View style={{
                                alignSelf: 'center',
                                position: 'absolute',
                                // justifyContent: 'space-between',
                                flexDirection: 'row',
                                bottom: 5,
                                left: '7%',
                                right: '30%'
                            }}>
                                {this.currentIndex !== 15 && (
                                    <TouchableOpacity
                                        onPress={this.handleBack}
                                        disabled={confirmationLoading}
                                        style={[styles.button, {marginRight: 30, backgroundColor: '#A3A3A3'}]}>
                                        <Text style={styles.buttonText}>Atrás</Text>
                                    </TouchableOpacity>)}
                                <TouchableOpacity
                                    disabled={confirmationLoading}
                                    onPress={this.handleResetForm}
                                    style={[styles.button]}>
                                    <Text style={styles.buttonText}>Volver al inicio</Text>
                                </TouchableOpacity>
                            </View>

                        )}

                    </View>


                </View>
            </UserInactivity>

        );
        /*return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View>
        );*/
    }
}

const styles = StyleSheet.create({


    button: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#88c84c',
        // minWidth: 240,
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
        height:height,
        width:width
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
