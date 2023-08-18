import { createBrowserRouter } from "react-router-dom";
// import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ListPage } from "./pages/ListPage";
import { DetailsPage } from "./pages/DetailsPage"
import { SuggestionsPage } from "./pages/SuggestionsPage"
import App from "./App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: "register",
                element:<RegisterPage />,
            },
            {
                path: "list",
                element:<ListPage />,
            },
            {
                path: "details",
                element:<DetailsPage />,
            },
            {
                path: "suggestions",
                element:<SuggestionsPage />,
            },
        ],
    },
])