import {useEffect, useState} from "react";

const sendRequest = (url, settings) => {
    return fetch(url, settings);
}

export const useHttp = (url, settings, defaultValue) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(url, settings)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }, [url]);
}