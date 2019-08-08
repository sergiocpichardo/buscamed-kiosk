import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import UserInactivity from 'react-native-user-inactivity';

import {styles} from "../../utils/theme";
import CustomAlert from '../../components/CustomAlert';
import {api} from '../../../src/utils/api';


class PromptAppointment extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }
    }

    componentDidMount() {

    }

    promptAlert = () => {
        const {form, resetForm} = this.props.screenProps['PromptAppointment'];
        this.refs.customAlert.show("Esta seguro?", "Los datos suministrados hasta el momento serán removidos", [{
            text: 'Cancelar'

        }, {
            text: 'Ok',
            onPress: () => {
                if (!form.patient.id) {
                    api.patient.create(form)
                }

                this.refs.customAlert.dismiss();
                resetForm(false);
                this.props.navigation.navigate('Home');
            }
        }]);

    };


    render() {
        const {onNextSlide, form, createAppointment, loading, resetForm} = this.props.screenProps['PromptAppointment'];
        console.log(form);
        return (
            <View style={[styles.slide]}>

                <View style={[styles.section, styles.box, {padding: 30, justifyContent: 'flex-start'}]}>

                    {loading ? (
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={{fontSize: 24, marginBottom: 15}}>Por favor espere</Text>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.title}>
                                Confirmar sus datos
                            </Text>

                            <View style={[{width: '80%', marginTop: 40, marginBottom: 30}]}>

                                <View style={{margin: 15,}}>
                                    <Text style={{fontSize: 40}}>{form.firstName} {form.lastName} </Text>
                                    {Object.keys(form.gender).length !==0?<Text style={{fontSize:40}}>Soy {form.gender.name},</Text>:false}
                                    {form.id!==""?<Text style={{fontSize: 40}}>Mi número de cédula es: {form.id}</Text>:false}
                                    {form.email!==""?<Text style={{fontSize: 40}}>Mi correo electrónico es {form.email} </Text>:false}
                                    {form.phone!==""?<Text style={{fontSize:40}}> mi teléfono es {form.phone}</Text>:false}
                                    {Object.keys(form.bloodType).length !== 0?<Text style={{fontSize: 40}}>Mi tipo de sangre es {form.bloodType.name}</Text>:false}
                                    <Text style={{fontSize: 40}}>Mi cita con {form.doctor.doctor_firstname} a las {form.hour}</Text>
                                </View>


                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={this.promptAlert}
                                        style={[styles.buttonOutline,]}>
                                        <Text style={styles.buttonOutlineText}>No</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={()=>{createAppointment();this.props.navigation.navigate('Confirmation');}}
                                        style={[styles.buttonOutline,]}>
                                        <Text style={styles.buttonOutlineText}>Si</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )}


                </View>
                <CustomAlert ref="customAlert"/>
            </View>
        )
    }
}

export default PromptAppointment
