import React, {useCallback, useState} from "react";
import {Menu, Switch} from "antd";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {AppTheme} from "../../../config/types";
import {SharedActionsType} from "../../../redux/Actions/sharedActions";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {items} from "./items";
import {MenuInfo} from "rc-menu/lib/interface";

export function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.shared.appTheme);
    const [current, setCurrent] = useState("0");

    const changeTheme = (value: boolean) => {
        dispatch({
            type: SharedActionsType.SET_APP_THEME,
            payload: {
                appTheme: value ? AppTheme.DARK : AppTheme.LIGHT
            }
        });
    };

    const handleClick = useCallback((e: MenuInfo) =>  setCurrent(e.key), []);

    return (
        <div className="sidebar">
            <Menu className="menu"
                  onClick={handleClick}
                  selectedKeys={[current]}
                  theme={currentTheme}
            >
                <Switch
                    checked={currentTheme === "dark"}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <div className="home-logo">
                    <a onClick={() => navigate("/")}>
                        <img src={SpotifyLogo} className="home-logo" alt="SpotifyLogo"/>
                    </a>
                </div>
                {items.map((item, index) => {
                    return (
                        <Menu.Item key={index}
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
}
