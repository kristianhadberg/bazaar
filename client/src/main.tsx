import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
