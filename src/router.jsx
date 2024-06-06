import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Register from "./pages/auth/register/Register.jsx";

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Register/>
            }
        ]
    }
])