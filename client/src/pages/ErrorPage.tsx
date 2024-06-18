import Menu from "@/components/Menu";
import NavBar from "@/components/NavBar";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();

    return (
        <>
            <div className="layout min-h-screen">
                <NavBar />
                <Menu />
                <h1 className="text-xl">{isRouteErrorResponse(error) ? "Page not found." : "Unexpected error occured."}</h1>
            </div>
        </>
    );
}

export default ErrorPage;
