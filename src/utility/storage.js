export const storeUserDataToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
}

export const getUserDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user"));
}