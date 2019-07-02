import {request, url} from "../config";

export const getBloodGroups = () => {
    const requestUrl = `${url}/get_blood_groups`;
    return request(requestUrl);
};