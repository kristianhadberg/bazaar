// import useAuthStore from "@/store";
// import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";

// type PrivateRouteProps = RouteProps & {
//     element: React.ReactNode;
// };

// const PrivateRoute: React.FC<PrivateRouteProps> = () => {
//     const { user } = useAuthStore();

//     // return user ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
//     return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import useAuthStore from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useAuthStore();

    return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
