import React, {useState} from "react";
import {Menu, MenuTheme, Switch} from "antd";
import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined,
    PlusSquareFilled,
    HeartOutlined
} from "@ant-design/icons";
import "./Sidebar.css";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";

export function Sidebar() {

    const [theme, setTheme] = useState<MenuTheme | undefined>("dark");
    const [current, setCurrent] = useState("1");

    const changeTheme = (value: boolean) => {
        setTheme(() => value ? "dark" : "light");
    };

    const handleClick = (e: any) => {
        console.log("click ", e);
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
                <Menu.Item key="2" className="menu__item" icon={<SearchOutlined/>}>Поиск</Menu.Item>
                <Menu.Item key="3" className="menu__item" icon={<ProfileOutlined/>}>Моя медиатека</Menu.Item>
                <Menu.Item key="4" className="create-playlist" icon={<PlusSquareFilled/>}>Создать плейлист</Menu.Item>
                <Menu.Item key="5" className="favourite-tracks" icon={<HeartOutlined/>}>Любимые треки</Menu.Item>
                <Menu.Item key="6" className="my-playlists">{}</Menu.Item>
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
