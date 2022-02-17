import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import React, {useEffect, useState} from "react";
import {getAlbumByIdRequest} from "../../../redux/Actions/thunkAlbumActions";
import {Song} from "../../Song/Song";
import "./AlbumPage.scss";
import {formWordTrack} from "../../../utils/declension.utils";
import {getTimesOfTracks} from "../../../utils/time-format.utils";
import {AlbumType, SongType} from "../../../config/types";
import {useActions} from "../../../hooks/useActions";
import ArtistAPI from "../../../API/ArtistAPI";
import AlbumAPI from "../../../API/AlbumAPI";

export function AlbumPage() {
    const urlParams = useParams();
    const dispatch = useDispatch();
    // const album = useSelector((state: RootState) => state.album.albums.find(it => urlParams.id === it._id));
    const { setPlayingSong, setPlayingSongList } = useActions();
    const [songs, setSongs] = useState<SongType[]>([]);
    const [album, setAlbum] = useState<AlbumType>({artist: '', _id: '', name: '',  songs: [], cover: ''});

    useEffect(() => {
        if (urlParams.id) {
            AlbumAPI.getAlbumById(urlParams.id).then(data => {
                setAlbum(data.album);
                setSongs(data.songs);
            });
            // dispatch(getAlbumByIdRequest(urlParams.id));
        }
    }, [urlParams.id]);

    const numOfSongsInAlbum = songs.length;


    function onPlay(song: SongType) {
        setPlayingSongList(songs);
        setPlayingSong(song);
    }

    return (
        !album
            ? <div>Ошибка при получении альбома</div>
            : <div className="info">
                <div className="info__header info__header_album">
                    <div className="info__cover">
                        <img src={album.cover}
                             alt="Изображение обложки"/>
                    </div>
                    <div className="info__desc">
                        <h2 className="desc__category">Альбом</h2>
                        <h1 className="desc__name desc__name_album">{album.name}</h1>
                        <span className="desc__text">
                            {album.artist} &bull; {numOfSongsInAlbum} {formWordTrack(numOfSongsInAlbum)}, {getTimesOfTracks(songs)}
                        </span>
                    </div>
                </div>
                <div className="info__main">
                    <h2 className="main__title">Песни</h2>
                    <div className="main__songs">
                        {songs.map((song, index) => {
                            return <Song song={song} order={index + 1} key={song._id} onPlay={() => onPlay(song)}/>;
                        })
                        }
                    </div>
                </div>
            </div>
    );
}
