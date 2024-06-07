import {useHttp} from "../../../hooks/useHttp.js";
import {useForm} from "../../../hooks/useForm.js";
import {useEffect, useState} from "react";
import Input from "../../../components/shared/input/Input.jsx";
import Button from "../../../components/shared/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {passwordsMatching} from "../../../utility/utility.js";
import {signup} from "../../../api/auth.js";

export default function Signup({formStyle}) {
    const navigate = useNavigate();
    const {data: userData, isLoading, error, sendRequest} = useHttp({initiate: false});
    const {formData: signUpData, register, handleSubmit, clearFieldValue} = useForm();
    const [isPasswordsMatching, setIsPasswordsMatching] = useState(null);

    const buttonCaption = userData ? "Successful registration. Redirecting..." : "Signup";

    const handleRedirect = () => {
        navigate("/login");
    }

    useEffect(() => {
        if (signUpData) {
            if (passwordsMatching(signUpData["password"].value, signUpData["confirm-password"].value)) {
                setIsPasswordsMatching(true);
                sendRequest(signup.url, signup.settings(signUpData));
            } else {
                clearFieldValue("password");
                clearFieldValue("confirm-password");
                setIsPasswordsMatching(false);
            }
        }
    }, [signUpData])

    useEffect(() => {
        if (userData) {
            setTimeout(() => {
                navigate("/");
            }, 2000)
        } else if (error) {
            clearFieldValue("password");
            clearFieldValue("confirm-password");
        }
    }, [userData, error]);

    return (
        <>
            {error && <p className={"error"}>{error.message}</p>}

            <form onSubmit={handleSubmit} className={formStyle}>
                <Input
                    label={"email"}
                    {...register("email", "", {required: true, minLength: 6, email: true})}>
                    Email
                </Input>

                <Input
                    label={"username"}
                    {...register("username", "", {required: true, minLength: 6})}>
                    Username
                </Input>

                <Input type={"password"} label={"password"}
                       {...register("password", "", {required: true, minLength: 6})}>
                    Password
                </Input>

                <Input type={"password"}
                       label={"confirm-password"} {...register("confirm-password", "", {required: true})}>
                    Confirm password
                </Input>

                {isPasswordsMatching === false && <p className={"error"}>Passwords doesnt match</p>}

                <Button disabled={isLoading} type={"submit"}>
                    {buttonCaption}
                </Button>
            </form>

            <Button onClick={handleRedirect} className={"secondary"}>
                Already registered? Login
            </Button>
        </>
    )
}