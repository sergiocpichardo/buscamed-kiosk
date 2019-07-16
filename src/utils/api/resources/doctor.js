import {request, url} from "../config";
import moment from "moment";

export const getSchedule = (doctorId, centerId, centerType, date) => {
    const requestUrl = `${url}/get_appointment_info_by_day_v2`;


    const body = {
        doctor_id: doctorId,
        date,
        selected_center_id: centerId,
        selected_center_type: centerType
    };

    // alert(JSON.stringify(body, undefined, 2));
    const data= new FormData();
    data.append("doctor_id", doctorId);
    data.append("date", date);
    data.append("selected_center_id", centerId);
    data.append("selected_center_type", centerType);

    return request(requestUrl, "POST", data, true);
};

export const getCalendarData = (doctorId, centerId, centerType, dateStart) => {
    dateStart = dateStart || moment();
    const dateEnd = moment(dateStart).add(3, 'months').format('YYYY-MM-DD');
    const requestUrl = `${url}/get_dates_for_doc?doctor_id=${doctorId}&selected_center_type=${centerType}&selected_center_id=${centerId}&date_start=${dateStart.format('YYYY-MM-DD')}&date_end=${dateEnd}`;

    // console.log("Endpoint", requestUrl);

    return request(requestUrl);


};