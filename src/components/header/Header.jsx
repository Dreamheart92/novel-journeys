import style from "./Header.module.css";
import Search from "../search/Search.jsx";
import AccountButton from "../account-button/AccountButton.jsx";

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style['header-primary']}>
                <div>
                    <h1>Logo</h1>
                </div>

                <div className={style['search-container']}>
                    <Search/>
                </div>

                <div>
                    <AccountButton/>
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