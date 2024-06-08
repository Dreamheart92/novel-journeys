import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import style from "./StarIcon.module.css";

export default function StarIcon() {
    return (
        <div className={style.star}>
            <FontAwesomeIcon icon={faStar} className={style['star-icon']}/>
            <FontAwesomeIcon icon={faStar} className={style['star-overlay']}/>
        </div>
    )
}