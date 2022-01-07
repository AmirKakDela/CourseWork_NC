import React, {useEffect} from 'react';
import './artistPage.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {useParams} from "react-router-dom";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {ArtistType} from "../../../config/types";
import {getArtist} from "../../../redux/Actions/thunkArtistAction";
import Song from "../../Song/Song";
import MoonLoader from "react-spinners/MoonLoader";
import {thunkUserLikedSongs} from "../../../redux/Actions/thunkUserActions";

const ArtistPage = () => {
    const urlParams = useParams();
    const dispatch = useDispatch();
    const artist: ArtistType = useSelector((state: RootState) => state.artist.artist)
    const isLoading = useSelector((state: RootState) => state.artist.isLoading);
    console.log(isLoading)
    useEffect(() => {
        if (urlParams.id) {
            dispatch(getArtist(urlParams.id))
            dispatch(thunkUserLikedSongs())
        }
    }, [])


    return (
        <>
            {
                isLoading ? <MoonLoader color={'white'} css={'margin: 0 auto'}/> : <div className="info">
                    <div className="info__header">
                        <div className="info__cover">
                            <img
                                src={artist.image}
                                alt="Изображение артиста"/>
                        </div>
                        <div className="info__desc">
                            <h2 className="desc__category">Исполнитель</h2>
                            <h1 className="desc__name">{artist.name}</h1>
                            <p className="desc__text">{artist.songs.length} трека, {artist.albums.length} альбома</p>
                        </div>
                    </div>
                    <div className="info__main">
                        <h2 className="main__title">Альбомы</h2>
                        <div className="main__slider">
                            {/*<AlbumCard/>*/}
                            {/*<AlbumCard/>*/}
                            {/*<AlbumCard/>*/}
                        </div>
                        <h2 className="main__title">Песни</h2>
                        <div className="main__songs">
                            {artist.songs.map((s, index) => (
                                <Song song={s} number={index + 1} key={s._id}/>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ArtistPage;