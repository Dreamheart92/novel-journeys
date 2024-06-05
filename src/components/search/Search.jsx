import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

import style from "./Search.module.css";

export default function Search() {
    return (
        <div className={style.container}>
            <input className={style.search} type="text" placeholder="Search books..."/>

            <div className={style['search-icon']}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </div>
        </div>
    )
}