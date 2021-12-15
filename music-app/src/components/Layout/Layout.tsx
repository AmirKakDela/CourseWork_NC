import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Player} from "./Player/Player";
import "./Layout.scss";

const Layout = () => {
    return (
        <div className="layout">
            <Sidebar/>
            <Header/>
            <div className="main-content">
                <Outlet></Outlet>
            </div>
            <Player/>
        </div>
    );
};

export default Layout;
