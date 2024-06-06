import style from "./AccountButton.module.css";
import {Link} from "react-router-dom";

export default function AccountButton() {
    return (
        <button className={style.account}>
            <Link to="/login">
                Sign In
            </Link>
        </button>
    )
}