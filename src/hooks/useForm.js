import {useState} from "react";

export const useForm = ({initialValue}) => {
    const [formData, setFormData] = useState(initialValue);

    const register = (fieldName, fieldValue = "") => {
        setFormData(formData =>
            formData[fieldName] = fieldValue
        )
    }

    return {
        formData,
        register
    }
}