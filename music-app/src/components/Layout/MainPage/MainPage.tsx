import React from 'react';
import Header from '../Header/Header';
import {Sidebar} from '../Sidebar/Sidebar';
import "./MainPage.css"
import {Player} from "../Player/Player";

function MainPage() {
    return (
        <div className="main-page">
            <Sidebar/>
            <Header/>
            <div className="main-content">
                Main Page
            </div>
            <Player/>
        </div>
    );
}

export default MainPage;
