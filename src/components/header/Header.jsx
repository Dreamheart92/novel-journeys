import Search from "../search/Search.jsx";
import AccountButton from "../account-button/AccountButton.jsx";
import Menu from "../menu/Menu.jsx";

import style from "./Header.module.css";
import MenuItem from "../menu-item/MenuItem.jsx";
import Logo from "../logo/Logo.jsx";

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style['header-primary']}>
                <Logo/>

                <div className={style['search-container']}>
                    <Search/>
                </div>

                <div>
                    <AccountButton/>
                </div>

            </div>

            <div className={style['header-secondary']}>
                <Menu>
                    <MenuItem>
                        New
                    </MenuItem>

                    <MenuItem>
                        Most Rated
                    </MenuItem>

                    <MenuItem>
                        Fiction
                    </MenuItem>

                    <MenuItem>
                        Non-Fiction
                    </MenuItem>

                    <MenuItem>
                        Shop all
                    </MenuItem>
                </Menu>
            </div>
        </header>
    )
}