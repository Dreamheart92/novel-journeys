import {useRef, useState} from "react";
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
            case "email" : {
                const pattern = /^[a-zA-Z0-9]+@[a-z]+.[a-z]{2,5}$/;
                if (value.match(pattern) === null) {
                    errors[validationType] = "Email address is invalid"
                }
            }
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

export const useForm = (initialValue = {}) => {
    const [formState, setFormState] = useState(initialValue);
    const [formData, setFormData] = useState(null);

    const [fieldErrors, setFieldErrors] = useState(null);
    const [isSubmittedAndHasErrors, setIsSubmittedAndHasErrors] = useState(false);

    const validators = useRef({});

    const register = (fieldName, fieldValue = "", validation = {}) => {

        //Check if fieldName exist if would cause infinitive loop

        if (!formState.hasOwnProperty(fieldName)) {
            setFormState(prevFormState => ({
                ...prevFormState,
                [fieldName]: {value: fieldValue, isDirty: false}
            }))

            validators.current[fieldName] = validation;
            runValidators(fieldName, fieldValue);
        }

        return {
            handlers: {
                onChange: (event) => {
                    setFormState(prevState => ({
                        ...prevState,
                        [fieldName]: {...prevState[fieldName], value: event.target.value}
                    }))
                    runValidators(fieldName, event.target.value);
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
        setIsSubmittedAndHasErrors(false);

        if (fieldErrors !== null) {
            const isValidForm = Object.values(fieldErrors).every(requirement => requirement === null);

            if (isValidForm) {
                setFormData(formState);
            } else {
                setIsSubmittedAndHasErrors(true);
            }
        }
    }

    const clearFieldValue = (fieldName) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: {value: "", isDirty: false}
        }))

        runValidators(fieldName, "");
    }

    const runValidators = (fieldName, fieldValue) => {
        const fieldValidators = validators.current[fieldName];
        const fieldErrors = validateField(fieldValue, fieldValidators, fieldName);

        setFieldErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: fieldErrors
        }))
    }

    return {
        formState,
        register,
        handleSubmit,
        formData,
        clearFieldValue,
    }
}