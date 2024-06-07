import style from "./UserMenu.module.css";
import Menu from "../menu/Menu.jsx";
import MenuItem from "../menu-item/MenuItem.jsx";
import {Link, useNavigate} from "react-router-dom";
import {removeUserDataFromLocalStorage} from "../../utility/storage.js";
import {PATHS} from "../../constants/paths.js";

export default function UserMenu({isLoggedIn}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeUserDataFromLocalStorage();
        navigate("/");
    }

    return (
        <Menu>
            {!isLoggedIn &&
                <>
                    <MenuItem>
                        <Link to={PATHS.login}>
                            Login
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to={PATHS.signup}>
                            Signup
                        </Link>
                    </MenuItem>
                </>
            }

            {isLoggedIn &&
                <>
                    <MenuItem>
                        <Link to={"/login"}>
                            Account
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to={"/login"}>
                            Wishlist
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link to={"/login"}>
                            Cart
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <button onClick={handleLogout}
                                style={{backgroundColor: "transparent", border: "none", cursor: "pointer"}}>
                            Sign out
                        </button>
                    </MenuItem>
                </>
            }
        </Menu>
    )
}