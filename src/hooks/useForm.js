import {useState} from "react";
import {normalizeName} from "../utility/utility.js";

const validateField = (value, validations, fieldName) => {
    const errors = {};

    for (const validationType in validations) {
        const requirement = validations[validationType];

        switch (validationType) {
            case "required" : {
                if (value.trim() === "" && requirement) {
                    errors[validationType] = `${normalizeName(fieldName)} is required`
                }
                break;
            }
            case "minLength" : {
                if (value.trim().length < requirement) {
                    console.log("min length")
                    errors[validationType] = `${normalizeName(fieldName)} must be at least ${requirement} characters long`
                }
                break;
            }

            case "maxLength" : {
                if (value.trim().length > requirement) {
                    errors[validationType] = `${normalizeName(fieldName)} must not be more than ${requirement} characters`
                }
                break;
            }
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

const checkForFieldErrors = (fieldName, fieldValue, validation, setFieldErrors) => {
    const fieldErrors = validateField(fieldValue, validation, fieldName);

    setFieldErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: fieldErrors
    }))
}

export const useForm = (initialValue = {}) => {
    const [formData, setFormData] = useState(initialValue);
    const [fieldErrors, setFieldErrors] = useState(null);

    const register = (fieldName, fieldValue = "", validation = {}) => {

        //Check if fieldName exist if would cause infinitive loop

        if (!formData.hasOwnProperty(fieldName)) {
            setFormData(prevFormState => ({
                ...prevFormState,
                [fieldName]: fieldValue
            }))

            if (Object.keys(validation).length > 0) {
                checkForFieldErrors(fieldName, fieldValue, validation, setFieldErrors);
            }
        }

        return {
            handlers: {
                onChange: (event) => {
                    setFormData(prevState => ({
                        ...prevState,
                        [fieldName]: event.target.value
                    }))
                    checkForFieldErrors(fieldName, event.target.value, validation, setFieldErrors);
                }
            },
            state: {
                value: formData[fieldName],
                error: fieldErrors !== null ? fieldErrors[fieldName] || null : null
            }
        }
    }

    return {
        formData,
        register
    }
}