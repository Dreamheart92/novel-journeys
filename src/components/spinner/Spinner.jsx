import style from "./Spinner.module.css";

export default function Spinner({...props}) {
    return (
        <span {...props} className={style.loader}></span>
    )
}