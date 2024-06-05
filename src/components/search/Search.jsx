import style from "./Search.module.css";

export default function Search() {
    return (
        <input className={style.search} type="text" placeholder="Search books..."/>
    )
}