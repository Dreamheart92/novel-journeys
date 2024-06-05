import style from "./Header.module.css";

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style['header-primary']}>
                <div>
                    <h1>Logo</h1>
                </div>

                <div>
                    <input type="text" placeholder="Search books..."/>
                </div>

                <div>
                    <button>Sign in</button>
                </div>

            </div>

            <div className={style['header-secondary']}>
                <ul className={style.items}>
                    <li>Menu item</li>
                    <li>Menu item 2</li>
                    <li>Menu item 3</li>
                    <li>Menu item 4</li>
                    <li>Menu item 5</li>
                </ul>
            </div>
        </header>
    )
}