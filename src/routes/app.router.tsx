import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { Home } from "../pages/home/home";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path={"/"} exact />
        </BrowserRouter>
    );
};
