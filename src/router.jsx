import {createBrowserRouter} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
import Auth from "./pages/auth/auth/Auth.jsx";

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
                element: <Auth/>
            },
            {
                path: "/signup",
                element: <Auth/>
            }
        ]
    }
])