import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Player} from "./Player/Player";
import "./Layout.scss";

const Layout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;
