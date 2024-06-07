import {useEffect, useState} from "react";

const sendHttpRequest = async (url, settings, setData, setError, setIsLoading) => {
    setIsLoading(true);

    try {

        const response = await fetch(url, settings);
        const result = await response.json();

        if (!result.success) {
            setError({message: result.message, data: result.data});
        } else {
            setData(result.data);
        }
        setIsLoading(false);
    } catch (error) {
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
            setIsLoading(true);
            sendHttpRequest(url, settings, setData, setError, setIsLoading);
        }
    }, [url]);

    const sendRequest = (url, settings) => {
        sendHttpRequest(url, settings, setData, setError, setIsLoading);
    }

    return {
        data,
        isLoading,
        error,
        sendRequest
    }
}