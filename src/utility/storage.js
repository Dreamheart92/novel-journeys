import {userStorageEvent} from "./customEvents.js";

export const storeUserDataToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(userStorageEvent({type: "update", user: userData}));
}

export const removeUserDataFromLocalStorage = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(userStorageEvent({type: "delete"}));
}

export const getUserDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
}

export const storeGuestToLocalStorage = (guestData) => {
    localStorage.setItem("guest", JSON.stringify(guestData));
}

export const getGuestDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("guest"));
}

export const clearGuestDataFromLocalStorage = () => {
    localStorage.removeItem("guest");
}