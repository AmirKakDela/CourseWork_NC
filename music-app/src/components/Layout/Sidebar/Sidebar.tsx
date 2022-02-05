import React, {useCallback, useState} from "react";
import {Menu, Switch} from "antd";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {AppTheme, SidebarItemType} from "../../../config/types";
import {SharedActionsType} from "../../../redux/Actions/sharedActions";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {MenuInfo} from "rc-menu/lib/interface";

type PropsType = {
    items: SidebarItemType[]
}

const Sidebar: React.FC<PropsType> = (props) => {
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

    const handleClick = useCallback((e: MenuInfo) => setCurrent(e.key), []);

    return (
        <div className="sidebar">
            <div className="home-logo">
                <Link to='/'>
                    <img src={SpotifyLogo} alt="SpotifyLogo"/>
                </Link>
            </div>
            <Menu className="menu"
                  onClick={handleClick}
                  selectedKeys={[current]}
                  theme={currentTheme}
            >
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
            </Menu>
            <Switch
                checked={currentTheme === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
        </div>
    );
}

export default Sidebar;
