import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Input} from "antd";
import {AlbumType, ArtistType, SongType} from "../../../config/types";
import * as yup from "yup";
import {validationRulesAlbum} from "../../../config/ValidationRules";
import {useParams} from "react-router-dom";
import ArtistAPI from "../../../API/ArtistAPI";
import SongsAPI from "../../../API/SongsAPI";
import {useDispatch} from "react-redux";
import {setError} from "../../../redux/Actions/errorAction";
import AlbumAPI from "../../../API/AlbumAPI";

export type AlbumTypeWithoutId = {
    name: string,
    artist: string,
    songs: string[],
    cover: string,
    _id?: string
}

const initialValues: AlbumTypeWithoutId = {
    name: '',
    artist: '',
    songs: [],
    cover: ''
}

const validateSchema = yup.object().shape(validationRulesAlbum);

export const AdminAlbumForm: React.FC = () => {
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const [songs, setSongs] = useState<SongType[]>([]);
    const [albumSongs, setAlbumSongs] = useState<SongType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const dispatch = useDispatch();
    let isSelectedSongs = false;
    let isSelectedArtist = false;

    const onSubmit = (data: AlbumTypeWithoutId) => {
        console.log('onSubmit', data);
        data.artist = artists.find(artist => artist.name === data.artist)?.name || '';
        AlbumAPI.createAlbum(data).then(res => {
            res.data.message && dispatch(setError(res.data.message));
        })
    }

    useEffect(() => {
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data);
        });
        SongsAPI.getAllSongs().then(data => { //выводить только песни определенного артиста
            setSongs(data);
        });
    }, [])

    useEffect(() => {
        if (params.id) {
            AlbumAPI.getAlbumById(params.id).then((data: AlbumType<string>) => {
                console.log(data);
                initialValues.name = data.name;
                initialValues.artist = data.artist;
                initialValues.songs = data.songs;
                isSelectedArtist = data.artist === initialValues.artist;
            });
            // isSelectedSongs = songs === initialValues.songs;
        }
        setIsLoading(false);
    }, [])

    useEffect(() => {
        return () => {
            for (let key in initialValues) {
                // @ts-ignore
                initialValues[key] = '';
            }
        }
    }, [])


    return (
        <>
            {isLoading
                ? <h1>IsloadIng</h1>
                : <div className="admin-form">
                    <h1 className='admin-form__title'>Создание альбома</h1>
                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validateSchema}
                    >
                        {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => {
                            return <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Название альбома</label> <br/>
                                <Input name='name'
                                       className={`form__input`}
                                       id="name"
                                       type="text"
                                       autoComplete='off'
                                       placeholder="Введите название альбома"
                                       value={values.name}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                                {errors.name && touched.name && <p className="form__error_text">{errors.name}</p>}

                                <label htmlFor="artist">Исполнитель</label> <br/>
                                <select className={`form__input`}
                                        name='artist'
                                        id='artist'
                                        value={values.artist}
                                        onChange={handleChange}>
                                    <option value="" disabled>Выберите исполнителя</option>
                                    {artists && artists.map(artist => (
                                        <option key={artist._id} value={artist._id} selected={isSelectedArtist}>{artist.name}</option>
                                    ))}
                                </select>
                                {errors.artist && touched.artist &&
                                    <p className="form__error_text">{errors.artist}</p>}

                                <label htmlFor="cover">Обложка альбома</label> <br/>
                                <Input name='cover'
                                       className={`form__input form__input_upload`}
                                       id="cover"
                                       type="file"
                                       autoComplete='off'
                                       placeholder="Загрузите обложку для альбома"
                                       onBlur={handleBlur}
                                       onChange={(e) =>
                                           setFieldValue(
                                               'cover',
                                               e.target.files && e.target.files[0]
                                           )}
                                />
                                {errors.cover && touched.cover && <p className="form__error_text">{errors.cover}</p>}

                                <label htmlFor="songs">Песни</label> <br/>
                                <select className={`form__input`}
                                        name='songs'
                                        id='songs'
                                        value={values.songs}
                                        onChange={handleChange}
                                        multiple
                                >
                                    <option value="" disabled>Выберите песни</option>
                                    {songs && songs.map(song => (
                                        <option key={song._id} value={song._id} >{song.name}</option>
                                    ))}
                                </select>
                                {errors.songs && touched.songs && <p className="form__error_text">{errors.songs}</p>}

                                <button type="submit"
                                        className="form__button"
                                >
                                    Создать
                                </button>
                            </form>
                        }}
                    </Formik>
                </div>
            }
        </>
    );
};
