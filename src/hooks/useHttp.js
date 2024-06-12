import {useEffect, useState} from "react";
import {handleRequest} from "../utility/handleRequest.js";
import {getGuestDataFromLocalStorage, getUserDataFromLocalStorage} from "../utility/storage.js";

export const sendHttpRequest = async (url, settings) => {
    try {
        let body = settings?.hasOwnProperty("body") ? JSON.parse(settings.body) : {};
        const options = settings || {};

        if (!options.hasOwnProperty("method")) {
            options["method"] = "Get";
        }

        const user = getUserDataFromLocalStorage();
        const guest = getGuestDataFromLocalStorage();

        if (user) {
            if (options.hasOwnProperty("headers")) {
                options.headers['Authorization'] = user.accessToken;
            } else {
                options["headers"] = {"Authorization": user.accessToken};
            }
        }

        if (options.method.toLowerCase() !== "get") {
            if (guest) {
                body['guestId'] = guest._id;
            }
            options["body"] = JSON.stringify(body);
        }


        const response = await fetch(url, options);

        if (response.status === 204) {
            return {
                success: true,
                message: null,
                data: null
            }
        }

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message,
                data: result.data
            }
        } else {
            return {
                success: true,
                message: result.message,
                data: result.data
            }
        }
    } catch (error) {
        console.log(error);
        //TODO : redirect to 500 page something went wrong
    }
}

export const useHttp = ({url, settings, defaultValue, initiate = true}) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const method = settings?.method || "GET";
        if (initiate && method === "GET") {
            handleRequest(url, settings, sendHttpRequest, setData, setIsLoading, setError);
        }
    }, [url]);

    const sendRequest = (url, settings) => {
        handleRequest(url, settings, sendHttpRequest, setData, setIsLoading, setError);
    }

    return {
        data,
        isLoading,
        error,
        sendRequest
    }
}