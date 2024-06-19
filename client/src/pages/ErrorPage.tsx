import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();

    return (
        <>
            <h1 className="text-xl">{isRouteErrorResponse(error) ? "Page not found." : "Unexpected error occured."}</h1>
        </>
    );
}

export default ErrorPage;
