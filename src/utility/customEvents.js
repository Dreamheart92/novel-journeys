export const userStorageEvent = (action) => {
    return new CustomEvent("userStorageChange", {detail: action});
}