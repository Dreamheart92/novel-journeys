import {API_ENDPOINTS} from "../constants/api.endpoints.js";

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