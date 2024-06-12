import Header from "./components/header/Header.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "./store/user.slice.js";
import Spinner from "./components/spinner/Spinner.jsx";
import {
    getGuestDataFromLocalStorage,
    getUserDataFromLocalStorage,
    storeGuestToLocalStorage
} from "./utility/storage.js";
import Cart from "./components/cart/Cart.jsx";
import {getCartSettings, getGuestCartSettings, getUserCart} from "./api/cart.js";
import {sendHttpRequest} from "./hooks/useHttp.js";
import {cartActions} from "./store/cart.slice.js";
import {createGuest, registerGuestSettings} from "./api/auth.js";


export default function App() {
    const dispatch = useDispatch();
    const [resolveUser, setResolveUser] = useState(null);

    useEffect(() => {
        const handleUserStorageChange = event => {
            if (event.detail.type === "update") {
                dispatch(userActions.storeUser({user: event.detail.user}));
            } else if (event.detail.type === "delete") {
                dispatch(userActions.deleteUser());
            }
        }

        window.addEventListener("userStorageChange", handleUserStorageChange);

        return () => {
            window.removeEventListener("userStorageChange", handleUserStorageChange);
        }
    }, []);

    useEffect(() => {
        const user = getUserDataFromLocalStorage();

        if (user) {
            dispatch(userActions.storeUser({user}));
            getUserCart(dispatch);
        } else {
            const guest = getGuestDataFromLocalStorage();

            if (!guest) {
                createGuest();
            } else {

                // Fetch guest cart

                const requestSettings = getGuestCartSettings();
                sendHttpRequest(requestSettings.url, requestSettings.settings)
                    .then((response) => {
                        if (response.success) {
                            dispatch(cartActions.updateCart({cart: response.data}));
                        }
                    })
            }
        }

        setResolveUser(true);
    }, [])

    if (!resolveUser) {
        return (
            <Spinner/>
        )
    }

    return (
        <main>
            <Header/>
            <Cart/>
            <Outlet/>
        </main>
    )
}