export const handleRequest = (url, settings, sendHttpRequest, setData, setIsLoading, setError) => {
    setIsLoading(true);
    sendHttpRequest(url, settings)
        .then((response => {
            if (response.success) {
                setData(response.data);
            } else {
                setError({message: response.message, data: response.data});
            }
        }))
        .catch((error => console.log(error)))
        .finally(() => setIsLoading(false));
}