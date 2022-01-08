import React, {useEffect} from "react";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {getAlbumsByRequest} from "../../../redux/Actions/thunkAlbumActions";
import ArtistCard from "../../ArtistCard/ArtistCard";
import {getAllArtists} from "../../../redux/Actions/thunkArtistAction";

import "./MainPage.scss";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";

function MainPage() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAlbumsByRequest());
        dispatch(getAllArtists());
    }, []);

    const artists = useSelector((state: RootState) => state.artist.artists);
    const popularPlaylists = useSelector((state: RootState) => state.album.albums); // здесь надо получать плейлисты, а не альбомы
    const openPlaylistDetailsHandler = (id: string) => {
        // dispatch(getPlaylistByIdRequest(id));
        //навигироваться на страницу с плейлистом и получать из роута id
    };

    return (
        <div className="main-page-content">
            <ScrollComponent titleName="Не пропусти топовые плейлисты" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>; //когда будет
                    // написана бд с плейлистом, использовать не AlbumCard, а PlaylistCard
                })
            }/>
            <ScrollComponent titleName="Тема1" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                })}/>
            <ScrollComponent titleName="Тема2" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                })}/>
            <ScrollComponent titleName="Тема3" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                })}/>
            <ScrollComponent titleName="Тема4" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist} onAlbumClick={openPlaylistDetailsHandler}/>;
                })}/>
            <ScrollComponent titleName="Популярные исполнители" data={
                artists.length ? <div className="main-page__playlists-row">
                    {artists.map(art => {
                        return (<ArtistCard key={art._id} artist={art}/>);
                    })}</div> : null}/>
        </div>
    );
}

export default MainPage;
