import React, {useEffect} from "react";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {getAlbumsByRequest} from "../../../redux/Actions/thunkAlbumActions";
import ArtistCard from "../../ArtistCard/ArtistCard";
import {getAllArtists} from "../../../redux/Actions/thunkArtistAction";

import "./MainPage.scss";

function MainPage() {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getAlbumsByRequest());
        dispatch(getAllArtists())
    }, []);

    const artists = useSelector((state: RootState) => state.artist.artists);
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

            <div className="main-page__collections">
                <div className="main-page__title">
                    <h2 className="main-page__title__name">Популярные исполнители</h2>
                    <span className="main-page__title__more">Еще</span>
                </div>
                <div className="main-page__playlists artists">
                    {artists.length ? <div className="main-page__playlists-row">
                        {artists.map(art => {
                            return (<ArtistCard key={art._id} artist={art}/>)
                        })}</div> : null}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
