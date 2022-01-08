import React from "react";
import "./MainPage.scss";
import Genre from "../../Genre/Genre";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";

function MainPage() {
    const popularPlaylists = useSelector((state: RootState) => state.album.albums); // здесь надо получать плейлисты, а не альбомы
    const openPlaylistDetailsHandler = (id: string) => {
        // dispatch(getPlaylistByIdRequest(id));
        //навигироваться на страницу с плейлистом и получать из роута id
    };

    return (
        <div className="main-page">
            <div className="main-page__collections">
                <div className="main-page__title">
                    <h2 className="main-page__title__name">Не пропусти топовые плейлисты</h2>
                    <span className="main-page__title__more">Еще</span>
                </div>
                <div className="main-page__playlists">
                    {popularPlaylists.map(playlist => {
                        return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>; //когда будет
                        // написана бд с плейлистом, использовать не AlbumCard, а PlaylistCard
                    })}
                </div>
            </div>

            <div className="main-page__collections">
                <div className="main-page__title">
                    <h2 className="main-page__title__name">Тема1</h2>
                    <span className="main-page__title__more">Еще</span>
                </div>
                <div className="main-page__playlists">
                    {popularPlaylists.map(playlist => {
                        return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                    })}
                </div>
            </div>

            <div className="main-page__collections">
                <div className="main-page__title">
                    <h2 className="main-page__title__name">Тема2</h2>
                    <span className="main-page__title__more">Еще</span>
                </div>
                <div className="main-page__playlists">
                    {popularPlaylists.map(playlist => {
                        return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                    })}
                </div>
            </div>

            <div className="main-page__collections">
                <div className="main-page__title">
                    <h2 className="main-page__title__name">Тема3</h2>
                    <span className="main-page__title__more">Еще</span>
                </div>
                <div className="main-page__playlists">
                    {popularPlaylists.map(playlist => {
                        return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                    })}
                </div>
            </div>

            <div className="main-page__collections">
                <div className="main-page__title">
                    <h2 className="main-page__title__name">Тема4</h2>
                    <span className="main-page__title__more">Еще</span>
                </div>
                <div className="main-page__playlists">
                    {popularPlaylists.map(playlist => {
                        return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
