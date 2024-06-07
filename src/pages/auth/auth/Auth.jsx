import {useLocation} from "react-router-dom";

import Login from "../login/Login.jsx";
import Signup from "../signup/Signup.jsx";

import style from "./Auth.module.css";

export default function Auth() {
    const path = useLocation().pathname;

    const isOnLoginPage = path === "/login";
    const heading = isOnLoginPage ? "Login" : "Signup";
    const caption = isOnLoginPage ?
        "Welcome Back to Novel Journeys – Dive Back Into Your Story!"
        : "Join Novel Journeys Today – Your Next Adventure Awaits!"

    return (
        <section className={style.container}>
            <div className={style.heading}>
                <h2>{heading}</h2>
                <p>{caption}</p>
            </div>

            <div className={style['auth-container']}>
                {isOnLoginPage && <Login formStyle={style.form}/>}
                {!isOnLoginPage && <Signup formStyle={style.form}/>}
            </div>
        </section>
    )
}