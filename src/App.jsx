import Header from "./components/header/Header.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "./store/user.slice.js";
import Spinner from "./components/spinner/Spinner.jsx";
import {getUserDataFromLocalStorage} from "./utility/storage.js";


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

        window.addEventListener("userStorageChange", handleUserStorageChange)

        const user = getUserDataFromLocalStorage();

        if (user) {
            dispatch(userActions.storeUser({user}))
        }

        setResolveUser(true);

        return () => {
            window.removeEventListener("userStorageChange", handleUserStorageChange);
        }
    }, []);

    if (!resolveUser) {
        return (
            <Spinner/>
        )
    }

    return (
        <main>
            <Header/>
            <Outlet/>
        </main>
    )
}