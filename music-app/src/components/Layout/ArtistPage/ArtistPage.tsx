import React, {useEffect} from "react";
import "./artistPage.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {useParams} from "react-router-dom";
import {getArtist} from "../../../redux/Actions/thunkArtistAction";
import {Song} from "../../Song/Song";
import MoonLoader from "react-spinners/MoonLoader";
import {thunkUserLikedSongs} from "../../../redux/Actions/thunkUserActions";
import AlbumCard from "../../AlbumCard/AlbumCard";

const ArtistPage = () => {
    const urlParams = useParams();
    const dispatch = useDispatch();
    const artist = useSelector((state: RootState) => state.artist.artists.find(it => urlParams.id === it._id));
    const albums = useSelector((state: RootState) => state.album.albums);
    const songs = useSelector((state: RootState) => state.song.tracks);
    const isLoading = useSelector((state: RootState) => state.artist.isLoading);
    useEffect(() => {
        if (urlParams.id) {
            dispatch(getArtist(urlParams.id));
            dispatch(thunkUserLikedSongs());
        }
    }, []);

    return (
        <>
            {
                !artist || isLoading
                    ? <MoonLoader color={"white"} css={"margin: 0 auto"}/>
                    : <div className="info">
                        <div className="info__header">
                            <div className="info__cover">
                                <img
                                    src={artist.image}
                                    alt="Изображение артиста"/>
                            </div>
                            <div className="info__desc">
                                <h2 className="desc__category">Исполнитель</h2>
                                <h1 className="desc__name">{artist.name}</h1>
                                <p className="desc__text">{songs.length} трека, {albums.length} альбома</p>
                            </div>
                        </div>
                        <div className="info__main">
                            <h2 className="main__title">Альбомы</h2>
                            <div className="main__slider">
                                {albums.map(album => <AlbumCard key={album._id} album={album}/>)}
                            </div>
                            <h2 className="main__title">Песни</h2>
                            <div className="main__songs">
                                {songs.map((s, index) => (
                                    <Song song={s} order={index + 1} key={s._id}/>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default ArtistPage;
