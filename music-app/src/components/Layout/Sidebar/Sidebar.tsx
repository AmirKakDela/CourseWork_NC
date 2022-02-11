import React, {useCallback, useEffect, useState} from "react";
import {Menu, Switch} from "antd";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {AppTheme, PlaylistType, SidebarItemType} from "../../../config/types";
import {SharedActionsType} from "../../../redux/Actions/sharedActions";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {items} from "./items";
import {MenuInfo} from "rc-menu/lib/interface";
import {createPlaylistByRequest, getPlaylistsByRequest} from "../../../redux/Actions/thunkPlaylistActions";
import {HeartOutlined, PlusSquareFilled} from "@ant-design/icons";

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
                appTheme: value ? AppTheme.DARK : AppTheme.LIGHT,
            },
        });
    };

    const handleClick = useCallback((e: MenuInfo) => setCurrent(e.key), []);

    const playlists = useSelector((state: RootState) => state.playlist.playlists);
    const user = useSelector((state: RootState) => state.user.currentUser)

    const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType | undefined>(undefined)

    const isLoading = useSelector((state: RootState) => state.playlist.isLoading);
    console.log(isLoading);

    function createPlaylist() {
        const playlistsByCurrentUser = playlists.filter(el => el.user == user.userId)

        const newPlaylist: PlaylistType = {
            name: `Мой плейлист №${playlistsByCurrentUser.length + 1}`,
            user: user.userId,
            songs: []
        }

        setCurrentPlaylist(newPlaylist)
        dispatch(createPlaylistByRequest(newPlaylist))
    }

    function checkCurrentPlaylist() {
        if (currentPlaylist) {
            const newPlaylist = playlists.find(el => (
                el.name === currentPlaylist.name &&
                el.user === currentPlaylist.user
            ))
            if (newPlaylist) {
                setCurrentPlaylist(undefined)
                navigate(`/playlist/${newPlaylist._id}`)
            }
        }
    }

    useEffect(() => {
        dispatch(getPlaylistsByRequest());
    }, []);

    useEffect(() => {
        checkCurrentPlaylist()
    }, [playlists, currentPlaylist])

    return (
        <div className="sidebar">
            <Menu
                className="menu"
                onClick={handleClick}
                selectedKeys={[current]}
                theme={currentTheme}
            >

                <div className="home-logo">
                    <a onClick={() => navigate("/")}>
                        <img src={SpotifyLogo} className="home-logo" alt="SpotifyLogo"/>
                    </a>
                </div>
                {items.map((item, index) => {
                    return (
                        <Menu.Item
                            key={index}
                            onClick={() => navigate(item.path)}
                            icon={item.icon && React.createElement(item.icon)}
                            id={item.itemId}
                        >
                            {item.text}
                        </Menu.Item>
                    );
                })}
                <Menu.Item
                    key="3"
                    onClick={() => createPlaylist()}
                    icon={PlusSquareFilled && React.createElement(PlusSquareFilled)}
                    id="create-playlist">Создать плейлист</Menu.Item>
                <Menu.Item key="4"
                           onClick={() => navigate("/loved")}
                           icon={HeartOutlined && React.createElement(HeartOutlined)}
                           id="favourite-tracks">Любимые треки</Menu.Item>
                <hr style={{width: "100%"}}/>
                {playlists.length > 0 && <Menu.ItemGroup className="sidebar__playlists">
                    {playlists.map((item, index) => {
                        return (
                            <Menu.Item
                                key={5 + index}
                                onClick={() => navigate(`/playlist/${item._id}`)}
                                id={item._id}>
                                {item.name}
                            </Menu.Item>
                        );
                    })}
                </Menu.ItemGroup>}
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
