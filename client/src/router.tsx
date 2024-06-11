import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AddItemPage from "./pages/AddItemPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/add-item", element: <AddItemPage /> },
        ],
    },
]);

export default router;
