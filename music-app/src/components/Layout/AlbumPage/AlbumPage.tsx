import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import React, {useEffect} from "react";
import {getAlbumByIdRequest} from "../../../redux/Actions/thunkAlbumActions";
import {Song} from "../../Song/Song";
import "./AlbumPage.scss";

export function AlbumPage() {
    const urlParams = useParams();
    const dispatch = useDispatch();
    const album = useSelector((state: RootState) => state.album.albums.find(it => urlParams.id === it._id));
    useEffect(() => {
        if (urlParams.id) {
            dispatch(getAlbumByIdRequest(urlParams.id));
        }
    }, []);

    const getTimesOfTracks = () => {
        let time: number;
        let allSec = album!.songs.map(song => time += song.duration, time = 0).reverse()[0];
        let hour = Math.floor(allSec / 3600);
        let min = Math.floor(allSec % 3600 / 60);
        let sec = Math.floor(allSec % 3600 % 60);

        let hourDis = hour > 0 ?  `${hour} ч. ` : "";
        let minDis = min > 0 ? `${min} мин. ` : "";
        let secDis = sec > 0 ? `${sec} сек.` : "";

        return hourDis + minDis + secDis;
    }
    return (
        !album
            ? <div>Ошибка при получении альбома</div>
            : <div className="info">
                <div className="info__header info__header_album">
                    <div className="info__cover">
                        <img
                            src={album.cover}
                            alt="Изображение обложки"/>
                    </div>
                    <div className="info__desc">
                        <h2 className="desc__category">Альбом</h2>
                        <h1 className="desc__name desc__name_album">{album.name}</h1>
                        <span className="desc__text">{album.artist} &bull; {album.songs.length} трека, { getTimesOfTracks()}</span>
                    </div>
                </div>
                <div className="info__main">
                    <h2 className="main__title">Песни</h2>
                    <div className="main__songs">
                        {album.songs.map((s, index) => (
                            <Song song={s} order={index + 1} key={s._id}/>
                        ))}
                    </div>
                </div>
            </div>
    );
}
