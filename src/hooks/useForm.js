import {useState} from "react";

export const useForm = ({initialValue}) => {
    const [formData, setFormData] = useState(initialValue);
}