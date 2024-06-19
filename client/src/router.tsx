import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
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
import UserListingsPage from "./pages/UserListingsPage";
import ProtectedRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
                <Route path="/listings" element={<UserListingsPage />}></Route>
            </Route>
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/auctions/:id" element={<AuctionDetailPage />} />
            <Route path="/add-auction" element={<AddAuctionPage />} />
            <Route path="/" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

export default router;
