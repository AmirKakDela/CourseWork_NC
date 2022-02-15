import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import {Player} from "./Player/Player";
import "./Layout.scss";
import {items} from "./Sidebar/items";
import cx from "classnames";
import {darkTheme, lightTheme} from "./theme-context/constants";
import {ThemeContext} from "./theme-context/constants";
import {MenuTheme} from "antd";

const Layout = (props: any) => {

    const layout = (theme: MenuTheme | undefined) => {
        const themeClassName = cx({
            "_dark":theme === darkTheme,
            "_light": theme === lightTheme
        });
        console.log(theme);
        return (
            <div className="layout">
                <div className={`sidebar ${themeClassName}`}>
                    <Sidebar items={items} currentTheme={theme} changeTheme={props.changeTheme}/>
                </div>
                <div className={`header ${themeClassName}`}>
                    <Header/>
                </div>
                <div className={`main-content ${themeClassName}`}>
                    <Outlet/>
                </div>
                <div className={`player ${themeClassName}`}>
                    <Player/>
                </div>
            </div>
        )
    }
    return <ThemeContext.Consumer>{(theme: MenuTheme | undefined) => layout(theme)}</ThemeContext.Consumer>;
};

export default Layout;
