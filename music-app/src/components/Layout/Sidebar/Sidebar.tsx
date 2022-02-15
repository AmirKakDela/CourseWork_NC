import React, {useCallback, useState} from "react";
import {Menu, MenuTheme, Switch} from "antd";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {SidebarItemType} from "../../../config/types";
import {Link, useNavigate} from "react-router-dom";
import {MenuInfo} from "rc-menu/lib/interface";

type PropsType = {
    items: SidebarItemType[],
    currentTheme?: MenuTheme,
    changeTheme?: (e: boolean) => void
}

const Sidebar: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState("0");
    const handleClick = useCallback((e: MenuInfo) => setCurrent(e.key), []);

    return (
        <Menu className="menu"
              onClick={handleClick}
              selectedKeys={[current]}
              theme={props.currentTheme}
        >
            <div className="sidebar">
                <div className="home-logo">
                    <Link to="/">
                        <img src={SpotifyLogo} alt="SpotifyLogo"/>
                    </Link>
                </div>
                {props.items.map((item, index) => {
                    return (
                        <Menu.Item key={index}
                                   onClick={() => navigate(item.path)}
                                   icon={item.icon && React.createElement(item.icon)}
                                   id={item.itemId}>
                            {item.text}
                        </Menu.Item>
                    );
                })}
                <Switch className="switch"
                    checked={props.currentTheme === "dark"}
                    onChange={props.changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
        </Menu>
    );
};

export default Sidebar;
