import React, {useCallback, useEffect, useState} from "react";
import {Menu, MenuTheme} from "antd";
import "./Sidebar.scss";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AppTheme, PlaylistType, SidebarItemType} from "../../../config/types";
import {SharedActionsType} from "../../../redux/Actions/sharedActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {items} from "./items";
import {MenuInfo} from "rc-menu/lib/interface";
import {HeartOutlined, PlusSquareFilled} from "@ant-design/icons";
import PlaylistAPI from "../../../API/PlaylistAPI";
import {thunkUserPlaylists} from "../../../redux/Actions/thunkUserActions";

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
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.shared.appTheme);
    //const [current, setCurrent] = useState("0");

    const user = useSelector((state: RootState) => state.user.currentUser)
    const [playlists, setPlaylists] = useState<PlaylistType[]>([])
    //const [isLoading, setIsLoading] = useState<boolean>(true);

    //const handleClick = useCallback((e: MenuInfo) => setCurrent(e.key), []);

    const menuItemHandler = (itemPath: string) => {
        itemPath === "create-playlist" ? createPlaylist() : navigate(itemPath)
    }

    const createPlaylist = useCallback(() => {
        const playlistsByCurrentUser = playlists.filter(el => el.user.id === user.userId)

        let newPlaylistNumber = playlistsByCurrentUser.length + 1
        while (playlistsByCurrentUser.find( p => p.name === `Мой плейлист №${newPlaylistNumber}`)) newPlaylistNumber++

        console.log(playlistsByCurrentUser)
        const newPlaylist: PlaylistType = {
            name: `Мой плейлист №${newPlaylistNumber}`,
            user: {
                id: user.userId,
                name: user.userName
            },
            songs: []
        }

        //setCurrentPlaylist(newPlaylist)
        PlaylistAPI.createPlaylist(newPlaylist)
            .then(data => {
                console.log(data)
                dispatch(thunkUserPlaylists(user.userId))
                if (data.playlist) navigate(`/playlist/${data.playlist._id}`)

            })

    }, [playlists])

    useEffect(() => {
        //dispatch(thunkUserPlaylists(user.userId))
        console.log(user.likedPlaylists)
        setPlaylists([...user.playlists, ...user.likedPlaylists])
        console.log(user.playlists)
        /*PlaylistAPI.getUserPlaylists(user.userId).then(data => {
            setPlaylists(data.playlists)
            setIsLoading(false);
        })*/
    }, [dispatch, user.playlists, user.likedPlaylists]);

    //useEffect(())

    // useEffect(() => {
    //     setPlaylists([...user.playlists, ...user.likedPlaylists])
    //
    // })

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
                <Menu.ItemGroup className="menu__items">
                    {props.items.map((item, index) => {
                        return (
                            <Menu.Item
                                key={index}
                                onClick={() => menuItemHandler(item.path)}
                                icon={item.icon && React.createElement(item.icon)}
                                id={item.itemId}
                            >
                                {item.text}
                            </Menu.Item>
                        );
                    })}
                    {/*<Menu.Item
                        key="3"
                        onClick={createPlaylist}
                        icon={PlusSquareFilled && React.createElement(PlusSquareFilled)}
                        id="create-playlist">Создать плейлист</Menu.Item>
                    <Menu.Item key="4"
                               onClick={() => navigate("/loved")}
                               icon={HeartOutlined && React.createElement(HeartOutlined)}
                               id="favourite-tracks">Любимые треки</Menu.Item>*/}
                </Menu.ItemGroup>
                {!location.pathname.includes("/admin")
                    &&
                    playlists.length > 0
                    &&
                    <Menu.ItemGroup className="menu__playlists">
                        {playlists.map((item, index) => {
                            console.log(item)
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
            {/*<Switch
                checked={currentTheme === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />*/}
        </div>
    );
}

export default Sidebar;
