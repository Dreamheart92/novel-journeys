import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useHttp} from "../../../hooks/useHttp.js";
import {useForm} from "../../../hooks/useForm.js";

import {login} from "../../../api/auth.js";

import Input from "../../../components/shared/input/Input.jsx";
import Button from "../../../components/shared/button/Button.jsx";

export default function Login({formStyle}) {
    const navigate = useNavigate();
    const {data: userData, error, isLoading, sendRequest} = useHttp({initiate: false});
    const {formData: loginData, register, handleSubmit, clearFieldValue} = useForm();

    const buttonCaption = userData ? "Successful login. Redirecting..." : "Login";

    useEffect(() => {
        if (loginData) {
            sendRequest(login.url, login.settings(loginData));
        }
    }, [loginData]);

    const handleRedirect = () => {
        navigate("/signup");
    }

    useEffect(() => {
        if (userData) {
            setTimeout(() => {
                navigate("/");
            }, 2000)
        } else if (error) {
            clearFieldValue("password");
        }
    }, [userData, error]);


    return (
        <>
            {error && <p className="error">{error.message}</p>}

            <form onSubmit={handleSubmit} className={formStyle}>
                <Input label="email" {...register("email", "", {required: true, minLength: 6, email: true})}>
                    Email
                </Input>
                <Input label="password" type="password" {...register("password", "", {required: true, minLength: 6})}>
                    Password
                </Input>
                <Button disabled={isLoading} type="submit">{buttonCaption}</Button>
            </form>

            <Button onClick={handleRedirect} className={"outline"}>
                Create account
            </Button>
        </>
    )
}