import useAuthStore from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useAuthStore();

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
