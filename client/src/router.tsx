import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import ItemsPage from "./pages/ItemsPage";
import RegisterPage from "./pages/RegisterPage";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AuctionsPage from "./pages/AuctionsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <ItemsPage /> },
            { path: "/auctions", element: <AuctionsPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/add-item", element: <AddItemPage /> },
            { path: "/items/:id", element: <ItemDetailPage /> },
        ],
    },
]);

export default router;
