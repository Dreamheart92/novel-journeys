import Search from "../search/Search.jsx";
import UserMenu from "../user-menu/UserMenu.jsx";
import Menu from "../menu/Menu.jsx";

import style from "./Header.module.css";
import MenuItem from "../menu-item/MenuItem.jsx";
import Logo from "../logo/Logo.jsx";
import {removeUserDataFromLocalStorage} from "../../utility/storage.js";
import {useSelector} from "react-redux";

export default function Header() {
    const {user} = useSelector(state => state.user);

    return (
        <header className={style.header}>
            <div className={style['header-primary']}>
                <Logo/>

                <div className={style['search-container']}>
                    <Search/>
                </div>

                <div>
                    <UserMenu isLoggedIn={user}/>
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