import React, {useCallback, useEffect, useState} from "react";
import "./playlistPage.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {useNavigate, useParams} from "react-router-dom";
import {
    addTrackToPlaylistByRequest, deletePlaylistByRequest, deleteTrackFromPlaylistByRequest,
    getPlaylistByIdRequest,
    updatePlaylistByRequest
} from "../../../redux/Actions/thunkPlaylistActions";
import {Song} from "../../Song/Song";
import MoonLoader from "react-spinners/MoonLoader";
import EditPlaylistModal from "./EditPlaylistModal/EditPlaylistModal";
import {fetchSongs} from "../../../redux/Actions/thunkSongActions";
import {PlaylistType, Track} from "../../../config/types";
import {NotAddedTrack} from "./NotAddedTrack/NotAddedTrack";
import {Button, Form, Input, Menu, Modal, Popover} from "antd";
import {CaretRightFilled as PlayIcon, PauseOutlined as PauseIcon} from "@ant-design/icons";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PlayerReducerState} from "../../../redux/Reducers/playerReducer";

const PlaylistPage = () => {
    const urlParams = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [songs, setSongs] = useState<Track[]>([])
    const {pause, playback} = useTypedSelector<PlayerReducerState>((state: RootState) => state.player);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddBlockVisible, setIsAddBlockVisible] = useState(false)
    const {playSong, pauseSong, setPlayingSong} = useActions();
    const isPlayed = !pause;


    const playlist = useSelector((state: RootState) =>
        state.playlist.playlists.find((it) => urlParams.id === it._id)
    );
    const allSongs = useSelector((state: RootState) => state.song.tracks)
    const isPlaylistLoading = useSelector((state: RootState) => state.playlist.isLoading);


    console.log(isPlaylistLoading);


    //переписать
    function play() {
        setPlayingSong(songs[0]);
        if (isPlayed) {
            pauseSong();
        } else {
            playSong();
        }
    }


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const addHandler = (item: Track) => {
        if (urlParams.id) {
            dispatch(addTrackToPlaylistByRequest(urlParams.id, item._id))
            const newSongs = songs.filter(s => s._id !== item._id)
            setSongs(newSongs)
        }
    }

    const deleteTrackHandler = (item: Track) => {
        if (urlParams.id) {
            dispatch(deleteTrackFromPlaylistByRequest(urlParams.id, item._id))
        }
    }

    const onCreate = useCallback((values: PlaylistType) => {
        if (urlParams.id) {
            dispatch(updatePlaylistByRequest(urlParams.id, values))
        }
        setIsModalVisible(false);
    }, [dispatch])


    const deletePlaylist = useCallback(() => {
        if (urlParams.id) {
            dispatch(deletePlaylistByRequest(urlParams.id))
            navigate("/")
        }
    }, [dispatch])


    const openAddBlock = () => {
        dispatch(fetchSongs())
        setIsAddBlockVisible(true)
    }

    useEffect(() => {
        if (urlParams.id) {
            dispatch(getPlaylistByIdRequest(urlParams.id));
        }
    }, []);

    useEffect(() => {
        if (urlParams.id && !isModalVisible) {
            dispatch(getPlaylistByIdRequest(urlParams.id));
        }
    }, [isModalVisible]);

    useEffect(() => {
        if (isAddBlockVisible) {
            if (playlist) {
                setSongs(allSongs.filter(s => playlist.songs.indexOf(s) < 0))
            }
        } else setSongs([])
    }, [isAddBlockVisible])

    const playlistOptions = () => {

        const optionsHandler = (option: string) => {
            switch (option) {
                case "delete_from_user":
                    break;
                case "edit": {
                    showModal();
                    break;
                }
                case "delete": {
                    deletePlaylist();
                    break;
                }
                case "share":
                    break;
            }
        }

        return (
            <Menu>
                <Menu.Item onClick={() => optionsHandler("delete_from_user")}>Удалить из профиля</Menu.Item>
                <Menu.Item onClick={() => optionsHandler("edit")}>
                    Изменить сведения
                </Menu.Item>
                <Menu.Item onClick={() => optionsHandler("delete")}>
                    Удалить
                </Menu.Item>
                <Menu.Item onClick={() => optionsHandler("share")}>Поделиться</Menu.Item>
            </Menu>
        )
    }

    return (
        <>
            {!playlist || isPlaylistLoading ? (
                <MoonLoader color={"white"} css={"margin: 0 auto"}/>
            ) : (
                <div className="playlist">
                    <div className="playlist__info">
                        <div className="info__header">
                            <div className="info__cover" onClick={showModal}>
                                <img src="" alt="Обложка плейлиста"/>
                            </div>
                            <div className="info__desc">
                                <h2 className="desc__category">Плейлист</h2>
                                <h1 className="desc__name" onClick={showModal}>
                                    {playlist.name}
                                </h1>
                                <p className="desc__text">{playlist.songs.length} трека</p>
                            </div>
                        </div>
                        <EditPlaylistModal
                            visible={isModalVisible}
                            onCreate={onCreate}
                            onCancel={handleCancel}
                            playlist={playlist}
                        />
                        <div className="info__actions">
                            {playlist.songs.length > 0 && <div className="actions__play"
                                                               onClick={play}>
                                {isPlayed
                                    ? <PauseIcon/>
                                    : <PlayIcon/>
                                }
                            </div>}
                            <Popover
                                placement="bottomLeft"
                                content={playlistOptions}
                                trigger="click"
                            >
                                <Button className="actions__options">&#8230;</Button>
                            </Popover>

                        </div>
                        {playlist.songs.length > 0 && <div className="info__main">
                            <h2 className="main__title">Песни</h2>
                            <div className="main__songs">
                                {playlist.songs.map((s, index) => (
                                    <Song song={s} order={index + 1} key={s._id}/>
                                ))}
                            </div>
                        </div>}
                    </div>
                    <div className="playlist__addsongs">
                        {!isAddBlockVisible ? (
                                <Button className="addsongs__open" onClick={openAddBlock}>Добавить
                                    песни?</Button>)
                            :
                            (<div className="addsongs__container">
                                <div className="addsongs__header">
                                    <h2 className="addsongs__title">Добавить песни</h2>
                                    <Button className="addsongs__close"
                                            onClick={() => setIsAddBlockVisible(false)}>X</Button>
                                </div>
                                <div className="addsongs__songs">
                                    {songs.map((song, index) => (
                                        <NotAddedTrack song={song} key={song._id}
                                                       onAdd={() => addHandler(song)}/>))
                                    }
                                </div>
                            </div>)}
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaylistPage;
