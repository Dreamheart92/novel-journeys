import Header from "./components/header/Header.jsx";
import {Outlet} from "react-router-dom";

export default function App() {
    return (
        <main>
            <Header/>
            <Outlet/>
        </main>
    )
}