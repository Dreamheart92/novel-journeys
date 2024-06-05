import style from "./MenuItem.module.css";

export default function MenuItem({children}) {
    return (
        <li className={style.item}>
            {children}
        </li>
    )
}