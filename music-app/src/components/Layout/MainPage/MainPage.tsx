import React from "react";
import "./MainPage.scss";
import {Sidebar} from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import {Player} from "../Player/Player";
import {Outlet} from "react-router-dom";

function MainPage() {
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
}

export default MainPage;
