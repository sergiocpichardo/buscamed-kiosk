import {request, url} from "../config";

export const getPatientByIdNumber = (id) => {
    const requestUrl = `${url}/get_patient_by_identity/${id}`;
    return request(requestUrl);
};

export const create = (payload) => {
    const requestUrl = `${url}/create_patient`;

    const body = {
        origin: "app-center-appointment-register",
        insurance: '1',
        identity: payload.id,
        new_name: payload.firstName,
        new_apellido: payload.lastName,
        new_email: payload.email,
        grupo_sanguineo: payload.bloodType.id,
        new_born: '',
        new_sex: payload.gender.id,
        new_phone: payload.phone,
    };

    const formData = new FormData();
    const entries = Object.entries(body);

    for (const [name, value] of entries) {
        formData.append(name, value);
    }

    return request(requestUrl, "POST", formData, true);
};