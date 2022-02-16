import React, {useCallback} from "react";
import {Menu, MenuTheme} from "antd";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {SidebarItemType} from "../../../config/types";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {MenuInfo} from "rc-menu/lib/interface";

type PropsType = {
    items: SidebarItemType[],
    currentTheme?: MenuTheme,
    // changeTheme?: (e: boolean) => void
}

const Sidebar: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    let location = useLocation();
    let current = props.items?.find(item => item?.path.includes(location.pathname))?.path || '/';
    const handleClick = useCallback((e: MenuInfo) => current = e.key, []);

    return (
        <div className="sidebar">
            <Menu className="menu"
                  onClick={handleClick}
                  selectedKeys={[current]}
                  theme={props.currentTheme}
            >
                <div className="home-logo">
                    <Link to="/">
                        <img src={SpotifyLogo} alt="SpotifyLogo"/>
                    </Link>
                </div>
                {props.items.map((item) => {
                    return (
                        <Menu.Item key={item.path}
                                   onClick={() => navigate(item.path)}
                                   icon={item.icon && React.createElement(item.icon)}
                                   id={item.itemId}>
                            {item.text}
                        </Menu.Item>
                    );
                })}
            </Menu>
        </div>
    );
};

export default Sidebar;
