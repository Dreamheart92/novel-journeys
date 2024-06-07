export const normalizeName = (value) => {
    const valuesArray = value.split("-");
    const firstName = valuesArray[0][0].toUpperCase() + valuesArray[0].slice(1);
    return firstName + " " + valuesArray.slice(1).join(" ");
}

export const passwordsMatching = (password, confirmPassword) => {
    return password === confirmPassword;
}