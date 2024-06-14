import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "../App.css";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

const Layout = () => {
    return (
        <>
            <div className="layout min-h-screen">
                <NavBar />
                <Menu />
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;
