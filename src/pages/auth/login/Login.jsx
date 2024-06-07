import Form from "../../../components/form/Form.jsx";
import {useForm} from "../../../hooks/useForm.js";
import Input from "../../../components/shared/input/Input.jsx";
import {useHttp} from "../../../hooks/useHttp.js";
import {login} from "../../../api/auth.js";
import {useEffect} from "react";

export default function Login() {
    const {data, error, isLoading, sendRequest} = useHttp({initiate: false});
    const {formData, register, handleSubmit} = useForm();

    console.log(data);
    console.log(error);

    useEffect(() => {
        if (formData) {
            sendRequest(login.url, login.settings(formData));
        }
    }, [formData]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="email" {...register("email", "", {required: true, minLength: 6})}/>
                <Input label="password" type="password" {...register("password", "", {required: true, minLength: 6})}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}