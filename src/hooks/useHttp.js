import {useEffect, useState} from "react";
import {handleRequest} from "../utility/handleRequest.js";

export const sendHttpRequest = async (url, settings) => {
    try {
        const response = await fetch(url, settings);

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