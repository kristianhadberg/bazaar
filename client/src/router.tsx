import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import ItemsPage from "./pages/ItemsPage";
import RegisterPage from "./pages/RegisterPage";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AuctionsPage from "./pages/AuctionsPage";
import AddAuctionPage from "./pages/AddAuctionPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <ItemsPage /> },
            { path: "/auctions", element: <AuctionsPage /> },
            { path: "/auctions/:id", element: <AuctionDetailPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/add-item", element: <AddItemPage /> },
            { path: "/add-auction", element: <AddAuctionPage /> },
            { path: "/items/:id", element: <ItemDetailPage /> },
        ],
    },
]);

export default router;
