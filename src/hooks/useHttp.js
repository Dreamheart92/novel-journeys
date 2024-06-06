import {useEffect, useState} from "react";

const sendHttpRequest = async (url, settings, setData, setError, setIsLoading) => {
    setIsLoading(true);
    const response = await fetch(url, settings);
    const result = await response.json();

    if (!result.success) {
        setError({message: result.message, data: result.data});
        setIsLoading(false);
        return;
    }

    setData(result.data);
    setIsLoading(false);
}

export const useHttp = ({url, settings, defaultValue}) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!settings || settings.method === "GET") {
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
        error
    }
}