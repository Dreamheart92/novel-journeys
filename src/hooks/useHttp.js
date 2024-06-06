import {useEffect, useState} from "react";

export const useHttp = ({url, settings, defaultValue}) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(url, settings)
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    throw new Error(data);
                }
                setData(data);
            })
            .catch((error) => {
                setError({message: data.message, data: data.data})
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [url]);

    return {
        data,
        isLoading,
        error
    }
}