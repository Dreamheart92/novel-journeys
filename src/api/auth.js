import {API_ENDPOINTS} from "../constants/api.endpoints.js";
import {sendHttpRequest} from "../hooks/useHttp.js";
import {storeGuestToLocalStorage} from "../utility/storage.js";

export const login = {
    url: API_ENDPOINTS.auth.login,
    settings: (userData) => {

        const body = {
            email: userData.email.value,
            password: userData.password.value
        }

        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    }
};

export const signup = {
    url: API_ENDPOINTS.auth.signup,
    settings: (userData) => {

        const body = {
            email: userData.email.value,
            username: userData.username.value,
            password: userData.password.value
        }

        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    }
}

export const registerGuestSettings = {
    url: API_ENDPOINTS.auth.guest,
    settings: {
        method: "Post"
    }
}

export const createGuest = async () => {
    sendHttpRequest(registerGuestSettings.url, registerGuestSettings.settings)
        .then((guestData) => storeGuestToLocalStorage(guestData.data));
}