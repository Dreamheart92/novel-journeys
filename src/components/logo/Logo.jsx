import style from "./Logo.module.css";
import {Link} from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/">
            <h1 className={style.logo}>
                Logo
            </h1>
        </Link>
    )
}