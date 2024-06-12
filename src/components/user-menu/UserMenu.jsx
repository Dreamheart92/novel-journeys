import style from "./UserMenu.module.css";
import Menu from "../menu/Menu.jsx";
import MenuItem from "../menu-item/MenuItem.jsx";
import {Link, useNavigate} from "react-router-dom";
import { removeUserDataFromLocalStorage} from "../../utility/storage.js";
import {PATHS} from "../../constants/paths.js";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart.slice.js";
import {createGuest} from "../../api/auth.js";

export default function UserMenu({isLoggedIn}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        removeUserDataFromLocalStorage();
        dispatch(cartActions.clearCart());
        createGuest();
        navigate("/");
    }

    const handleOpenCart = () => {
        dispatch(cartActions.openCart());
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
                        <button className={style.button} onClick={handleLogout}>
                            Sign out
                        </button>
                    </MenuItem>
                </>
            }

            <MenuItem>
                <button className={style.button} onClick={handleOpenCart}>
                    Cart
                </button>
            </MenuItem>
        </Menu>
    )
}