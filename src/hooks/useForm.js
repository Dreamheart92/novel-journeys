import {useState} from "react";

export const useForm = (initialValue = {}) => {
    const [formData, setFormData] = useState(initialValue);

    const register = (fieldName, fieldValue = "") => {

        //Check if fieldName exist if would cause infinitive loop

        if (!formData.hasOwnProperty(fieldName)) {
            setFormData(prevFormState => ({
                ...prevFormState,
                [fieldName]: fieldValue
            }))
        }

        return {
            onChange: (event) => {
                setFormData(prevState => ({
                    ...prevState,
                    [fieldName]: event.target.value
                }))
            }
        }
    }

    return {
        formData,
        register
    }
}