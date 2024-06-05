import style from "./Menu.module.css";

export default function Menu({children}) {
    return (
        <section className={style.menu}>
            {children}
        </section>
    )
}