import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Input} from "antd";
import './adminSongForm.scss';
import {ArtistType, GenreType, SongType} from "../../../config/types";
import GenreAPI from "../../../API/GenreAPI";
import * as yup from "yup";
import {validationRulesSong} from "../../../config/ValidationRules";
import {useParams} from "react-router-dom";
import ArtistAPI from "../../../API/ArtistAPI";
import SongsAPI from "../../../API/SongsAPI";
import {useDispatch} from "react-redux";
import {setError} from "../../../redux/Actions/errorAction";


export type SongTypeWithoutId = {
    name: string,
    artist: string,
    cover: string,
    song: string,
    genre: string,
    _id?: string
}

const initialValues: SongTypeWithoutId = {
    name: '',
    artist: '',
    cover: '',
    song: '',
    genre: '',
}

const validateSchema = yup.object().shape(validationRulesSong)

const AdminSongForm: React.FC = () => {
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const dispatch = useDispatch();

    const onSubmit = (data: SongTypeWithoutId) => {
        console.log('onSubmit', data);
        SongsAPI.createSong(data).then(res => {
            res.data.message && dispatch(setError(res.data.message));
        })
    }

    useEffect(() => {
        GenreAPI.getAllGenre().then(data => {
            setGenres(data)
        })
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data);
        })
    }, [])

    useEffect(() => {
        if (params.id) {
            SongsAPI.getSongById(params.id).then((data: SongType) => {
                console.log(data)
                initialValues.name = data.name
                initialValues.artist = data.artistId[0];
                initialValues.genre = data.genre;
            })
        }
        setIsLoading(false);
    }, [])


    return (
        <>
            {isLoading
                ? <h1>IsloadIng</h1>
                : <div className="admin-form">
                    <h1 className='admin-form__title'>Создание песни</h1>
                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validateSchema}>

                        {({values, touched, errors, handleSubmit, handleBlur, handleChange}) => {
                            return <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Название песни</label> <br/>
                                <Input name='name'
                                       className={`form__input`}
                                       id="name"
                                       type="text"
                                       autoComplete='off'
                                       placeholder="Введите название песни"
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
                                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                                    ))}
                                </select>
                                {errors.artist && touched.artist && <p className="form__error_text">{errors.artist}</p>}

                                <label htmlFor="cover">Обложка песни</label> <br/>
                                <Input name='cover'
                                       className={`form__input form__input_upload`}
                                       id="cover"
                                       type="file"
                                       autoComplete='off'
                                       placeholder="Загрузите обложку для песни"
                                       value={values.cover}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                                {errors.cover && touched.cover && <p className="form__error_text">{errors.cover}</p>}

                                <label htmlFor="song">Песня</label> <br/>
                                <Input name='song'
                                       className={`form__input`}
                                       id="song"
                                       type="file"
                                       autoComplete='off'
                                       placeholder="Загрузите песню"
                                       value={values.song}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                                {errors.song && touched.song && <p className="form__error_text">{errors.song}</p>}

                                <label htmlFor="genre">Жанр</label> <br/>
                                <select className={`form__input`}
                                        name='genre'
                                        id='genre'
                                        value={values.genre}
                                        onChange={handleChange}>
                                    <option value="" disabled>Выберите жанр</option>
                                    {genres && genres.map(genre => (
                                        <option key={genre._id} value={genre._id}>{genre.name}</option>
                                    ))}
                                </select>
                                {errors.genre && touched.genre && <p className="form__error_text">{errors.genre}</p>}

                                <button type="submit"
                                        className="form__button"
                                >Создать
                                </button>
                            </form>
                        }}

                    </Formik>
                </div>
            }

        </>
    );
};

export default AdminSongForm;
