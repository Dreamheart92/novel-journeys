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
    const [formState, setFormState] = useState(initialValue);
    const [formData, setFormData] = useState(null);

    const [fieldErrors, setFieldErrors] = useState(null);
    const [isSubmittedAndHasErrors, setIsSubmittedAndHasErrors] = useState(false);

    const register = (fieldName, fieldValue = "", validation = {}) => {

        //Check if fieldName exist if would cause infinitive loop

        if (!formState.hasOwnProperty(fieldName)) {
            setFormState(prevFormState => ({
                ...prevFormState,
                [fieldName]: {value: fieldValue, isDirty: false}
            }))

            if (Object.keys(validation).length > 0) {
                checkForFieldErrors(fieldName, fieldValue, validation, setFieldErrors);
            }
        }

        return {
            handlers: {
                onChange: (event) => {
                    setFormState(prevState => ({
                        ...prevState,
                        [fieldName]: {...prevState[fieldName], value: event.target.value}
                    }))
                    checkForFieldErrors(fieldName, event.target.value, validation, setFieldErrors);
                },
                onBlur: (event) => {
                    setFormState(prevState => ({
                        ...prevState,
                        [fieldName]: {...prevState[fieldName], isDirty: true}
                    }))
                }
            },
            state: {
                value: formState[fieldName]?.value,
                isDirty: formState[fieldName]?.isDirty,
                error: fieldErrors !== null ? fieldErrors[fieldName] || null : null
            },
            formState: {
                isSubmittedAndHasErrors
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fieldErrors !== null) {
            const isValidForm = Object.values(fieldErrors).every(requirement => requirement === null);

            if (isValidForm) {
                setFormData(formState);
            } else {
                setIsSubmittedAndHasErrors(true);
            }
        }
    }

    return {
        formState,
        register,
        handleSubmit,
        formData
    }
}