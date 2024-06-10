import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "../App.css";

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Layout;
