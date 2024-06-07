import {Link} from "react-router-dom";
import {PATHS} from "../../constants/paths.js";

import style from "./Logo.module.css";

export default function Logo() {
    return (
        <Link to={PATHS.home}>
            <h1 className={style.logo}>
                Logo
            </h1>
        </Link>
    )
}