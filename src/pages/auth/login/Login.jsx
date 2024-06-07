import Form from "../../../components/form/Form.jsx";
import {useForm} from "../../../hooks/useForm.js";
import Input from "../../../components/shared/input/Input.jsx";
import {useHttp} from "../../../hooks/useHttp.js";
import {login} from "../../../api/auth.js";
import {useEffect} from "react";

export default function Login({formStyle}) {
    const {data, error, isLoading, sendRequest} = useHttp({initiate: false});
    const {formData, register, handleSubmit} = useForm();

    useEffect(() => {
        if (formData) {
            sendRequest(login.url, login.settings(formData));
        }
    }, [formData]);

    return (
        <form onSubmit={handleSubmit} className={formStyle}>
            <Input label="email" {...register("email", "", {required: true, minLength: 6})}/>
            <Input label="password" type="password" {...register("password", "", {required: true, minLength: 6})}/>
            <button type="submit">Login</button>
        </form>
    )
}