import React, {useState} from "react";
import {Menu, MenuProps, MenuTheme, Switch} from "antd";
import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined,
    PlusSquareFilled,
    HeartOutlined
} from "@ant-design/icons";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {store} from "../../../redux/store";
import {AppTheme} from "../../../types";
import {SharedActionsType} from "../../../redux/Actions/sharedActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

export function Sidebar(props: any) {

    const theme: AppTheme = store.getState().shared.appTheme;
    const [current, setCurrent] = useState("1");

    const changeTheme = (value: boolean) => {
        store.dispatch({
            type: SharedActionsType.SET_APP_THEME,
            payload: {
                appTheme: value ? AppTheme.DARK : AppTheme.LIGHT
            }
        });
        // TODO: fix reload component when state are updated
    };

    const handleClick = (e: any) => {
        setCurrent(() => e.key);
    };
    return (

        <div className="sidebar">
            <Menu className="menu"
                  onClick={handleClick}
                  selectedKeys={[current]}
                  theme={theme}
            >
                <Switch
                    checked={theme === "dark"}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <div className="home-logo"><img src={SpotifyLogo} className="home-logo" alt="SpotifyLogo"/></div>
                <Menu.Item key="1" className="menu__item" icon={<HomeOutlined/>}>Главная</Menu.Item>
                <Link to='/search'><Menu.Item key="2" className="menu__item" icon={<SearchOutlined/>}>Поиск</Menu.Item></Link>
                <Menu.Item key="3" className="menu__item" icon={<ProfileOutlined/>}>Моя медиатека</Menu.Item>
                <Menu.Item key="4" id="create-playlist" icon={<PlusSquareFilled/>}>Создать плейлист</Menu.Item>
                <Menu.Item key="5" id="favourite-tracks" icon={<HeartOutlined/>}>Любимые треки</Menu.Item>
                <Menu.Item key="6" id="my-playlists">{}</Menu.Item>
            </Menu>

            {/*
             {/*        <svg role="img" height="24" width="24" className="Svg-sc-1bi12j5-0 gSLhUO collection-icon"*/
            }
            {/*             viewBox="0 0 24 24">*/}
            {/*            <path d="M13.66 4.097l-.913.406 7.797 17.513.914-.406L13.66 4.097zM3 22h1V4H3v18zm6 0h1V4H9v18z"/>*/}
            {/*        </svg>*/}
        </div>
    );
}
