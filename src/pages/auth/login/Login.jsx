import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useHttp} from "../../../hooks/useHttp.js";
import {useForm} from "../../../hooks/useForm.js";

import {login} from "../../../api/auth.js";

import Input from "../../../components/shared/input/Input.jsx";
import Button from "../../../components/shared/button/Button.jsx";

export default function Login({formStyle}) {
    const navigate = useNavigate();
    const {data, error, isLoading, sendRequest} = useHttp({initiate: false});
    const {formData, register, handleSubmit} = useForm();

    useEffect(() => {
        if (formData) {
            sendRequest(login.url, login.settings(formData));
        }
    }, [formData]);

    const handleRedirect = () => {
        navigate("/signup");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={formStyle}>
                <Input label="email" {...register("email", "", {required: true, minLength: 6})}/>
                <Input label="password" type="password" {...register("password", "", {required: true, minLength: 6})}/>
                <Button type="submit" caption={"Login"}>Login</Button>
            </form>

            <Button onClick={handleRedirect} className={"outline"}>
                Create account
            </Button>
        </>
    )
}