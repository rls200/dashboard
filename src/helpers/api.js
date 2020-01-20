import axios from "axios";
/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const API_URL = 'url';

const fetchJSON = (url, options = {}) => {
    return fetch(`${API_URL}/${url}`, options)
        .then(response => {
            if (!response.error === null) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            console.log("catch(error ", error);
            throw error;
        });
};

const YANDEX_API_URL = 'url';

const fetchYandexAPI = (url) => {
    return axios.get(`${YANDEX_API_URL}/${url}`)
        .then(response => {
            return response;
        }).catch(error => {
            return {error: error.message};
        });
};



export { fetchJSON, fetchYandexAPI };

