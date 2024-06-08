import {createBrowserRouter} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
import Auth from "./pages/auth/auth/Auth.jsx";
import {PATHS} from "./constants/paths.js";
import BookDetails from "./pages/details/BookDetails.jsx";

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: PATHS.home,
                element: <Home/>
            },
            {
                path: PATHS.login,
                element: <Auth/>
            },
            {
                path: PATHS.signup,
                element: <Auth/>
            },
            {
                path: PATHS.book + "/:id",
                element: <BookDetails/>
            }
        ]
    }
])