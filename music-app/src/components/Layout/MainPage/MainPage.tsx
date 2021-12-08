import React from 'react';
import Header from '../Header/Header';
import {Sidebar} from '../Sidebar/Sidebar';
import "./MainPage.css"

function MainPage() {
    return (
        <div className="main-page">
            <Sidebar/>
            <Header/>
            <div className="main-content">
                Main Page
            </div>
        </div>
    );
}

export default MainPage;
