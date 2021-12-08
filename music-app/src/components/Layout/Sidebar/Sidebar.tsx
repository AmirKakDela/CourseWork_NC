import {
    HomeOutlined,
    SearchOutlined,
    PlusSquareFilled,
    HeartOutlined
} from "@ant-design/icons";
import "./Sidebar.css"

import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";

export function Sidebar() {
    return (
        <div className="sidebar">
            <div className="menu">
                <div><img src={SpotifyLogo} className="home-logo" alt="SpotifyLogo" /></div>
                <div className="menu__item"><HomeOutlined/> <span>Главная</span></div>
                <div className="menu__item"><SearchOutlined/> <span>Поиск</span></div>
                <div className="menu__item">
                    <svg role="img" height="24" width="24" className="Svg-sc-1bi12j5-0 gSLhUO collection-icon"
                         viewBox="0 0 24 24">
                        <path d="M13.66 4.097l-.913.406 7.797 17.513.914-.406L13.66 4.097zM3 22h1V4H3v18zm6 0h1V4H9v18z"/>
                    </svg>
                    <span>Моя медиатека</span></div>
                <div className="create-playlist">
                    <PlusSquareFilled/>
                    <span>Создать плейлист</span>
                </div>
                <div className="favourite-tracks">
                    <HeartOutlined/>
                    <span>Любимые треки</span>
                </div>
                <div className="my-playlists">
                    {}
                </div>
            </div>
        </div>
    );
}
