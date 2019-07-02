import {request, url, baseUrl} from "../config";

export const getSpecialities = (id, type) => {
    const requestUrl = `${url}/get_center_specialities?id=${id}&center_type=${type}`;
    return request(requestUrl);
};


export const getDoctorsBySpeciality = (centerId, centerType, specialityId) => {
    const requestUrl = `${url}/get_center_doctors_by_speciality?center_id=${centerId}&center_type=${centerType}&speciality_id=${specialityId}`;
    return request(requestUrl);
};

export const getDeviceInfo = (id) => {
    const requestUrl = `${baseUrl}/Login/sign_in_device_auto/${id}`;
    return request(requestUrl);
};