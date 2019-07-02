// export const url = "https://froyoh.com/beforward-api/public/api";
// export const url = "https://beforward.do/api/v1";
// export const url = "http://laravel/beforward/beforward-api/public/api";
export const url = "http://buscamed.do/Webservice";
export const baseUrl = "http://buscamed.do";

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
};

export const request = (url, method = "GET", body = null, multi = false) => {

    const token = "";

    return new Promise((resolve, reject) => {

        const init = {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        if(!multi) {
            init['headers'] = {...headers, ...init['headers']}
        }

        if (body) {
            init["body"] = multi ? body : JSON.stringify(body)
        }


        fetch(url, init)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                // if (hasErrors(response)) {
                //     reject(response)
                // }

                resolve(response);

            })
            .catch(error => {
                // alert(error)
                reject(error)
            });
    });

};

const handleResponse = (res, noResponse) => {
    if(!noResponse) {
        return res.json();
    } else {
        return res.text()
    }

};

const hasErrors = (response) => {
    return response.hasOwnProperty("error")
        || response.hasOwnProperty("errors")
        || response.hasOwnProperty("exception");
};