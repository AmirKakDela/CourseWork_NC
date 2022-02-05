import React, {useEffect, useState} from "react";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {getAlbumsByRequest} from "../../../redux/Actions/thunkAlbumActions";
import ArtistCard from "../../ArtistCard/ArtistCard";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";
import "./MainPage.scss";
import {ArtistType} from "../../../config/types";
import ArtistAPI from "../../../API/ArtistAPI";

function MainPage() {
    const dispatch = useDispatch();
    const [artists, setArtists] = useState<ArtistType[]>([]);


    useEffect(() => {
        dispatch(getAlbumsByRequest());
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data)
        })
    }, [dispatch]);

    const popularPlaylists = useSelector((state: RootState) => state.album.albums); // здесь надо получать плейлисты, а не альбомы

    return (
        <div className="main-page-content">
            <ScrollComponent titleName="Не пропусти топовые плейлисты" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist}/>;
                })
            }/>
            <ScrollComponent titleName="Тема1" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist}/>;
                })}/>
            <ScrollComponent titleName="Тема2" data={
                popularPlaylists.map(playlist => {
                    return <AlbumCard key={playlist._id} album={playlist}/>;
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
