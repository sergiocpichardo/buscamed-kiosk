import {request, url} from "../config";
import moment from 'moment';

export const saveAndCreatePatient = (payload) => {

    const body = {
        origin: "app-center-appointment-register",
        doctor_id: payload.doctor.id,
        patient_id: payload.patient.id? payload.patient.id : '',
        appointment_date: payload.date,
        appointment_time: payload.hour,
        end_time: moment(payload.hour, "h:mm: A").add("15", "minutes").format("h:mm A"),
        insurance: '1',
        identity: payload.id,
        is_new_patient: !payload.patient.id,
        new_name: payload.firstName,
        new_apellido: payload.lastName,
        new_email: payload.email,
        grupo_sanguineo: payload.bloodType.id,
        new_born: '',
        gender: payload.gender.id,
        new_phone: payload.phone,
        selected_center_id: payload.centerId,
        selected_center_type: payload.centerType
    };

    const formData = new FormData();
    const entries = Object.entries(body);

    for (const [name, value] of entries) {
        formData.append(name, value);
    }

    if(payload.picture.uri) {
        formData.append("display_image", {
            uri: payload.picture.uri,
            name: new Date().getTime() + ".png",
            file_name: 'uppsies.png',
            type: 'image/png'
        });
    }


    // alert(JSON.stringify(body, undefined, 2));

    const requestUrl = `${url}/save_appointment_direct`;
    return request(requestUrl, "POST", formData, true);
};