import React, {useState} from "react";
import {Menu, Switch} from "antd";
import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined,
    PlusSquareFilled,
    HeartOutlined
} from "@ant-design/icons";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {AppTheme} from "../../../types";
import {SharedActionsType} from "../../../redux/Actions/sharedActions";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";

export function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.shared.appTheme);
    const [current, setCurrent] = useState("1");

    const changeTheme = (value: boolean) => {
        dispatch({
            type: SharedActionsType.SET_APP_THEME,
            payload: {
                appTheme: value ? AppTheme.DARK : AppTheme.LIGHT
            }
        });
    };

    const handleClick = (e: any) => {
        setCurrent(() => e.key);
    };
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
                <Menu.Item key="1" onClick={() => navigate("/")}
                           className="menu__item" icon={<HomeOutlined/>}>Главная</Menu.Item>
                <Menu.Item key="2" onClick={() => navigate("/search")}
                           className="menu__item" icon={<SearchOutlined/>}>Поиск</Menu.Item>
                <Menu.Item key="3" onClick={() => navigate("/my-library")}
                           className="menu__item" icon={<ProfileOutlined/>}>Моя медиатека</Menu.Item>
                <Menu.Item key="4" onClick={() => navigate("/create-playlist")}
                           id="create-playlist" icon={<PlusSquareFilled/>}>Создать плейлист</Menu.Item>
                <Menu.Item key="5" onClick={() => navigate("/loved")}
                           id="favourite-tracks" icon={<HeartOutlined/>}>Любимые треки</Menu.Item>
                <Menu.Item key="6" onClick={() => navigate("/my-playlists")}
                           id="my-playlists">{}</Menu.Item>
            </Menu>
        </div>
    );
}
