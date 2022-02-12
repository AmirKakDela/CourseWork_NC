import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Input} from "antd";
import './adminSongForm.scss';
import {GenreType} from "../../../config/types";
import GenreAPI from "../../../API/GenreAPI";

type SongTypeWithoutId = {
    name: string,
    artist: string,
    cover: string,
    song: string,
    duration: number,
    genre: string
}

const AdminSongForm: React.FC = () => {
    const [genres, setGenres] = useState<GenreType[]>([])
    const initialValues: SongTypeWithoutId = {
        name: '',
        artist: '',
        cover: '',
        song: '',
        duration: 0,
        genre: ''
    }

    const onSubmit = (data: SongTypeWithoutId) => console.log('Submit', data)

    useEffect(() => {
        GenreAPI.getAllGenre().then(data => {
            setGenres(data)
        })
    }, [])


    return (
        <div className="admin-form">
            <h1 className='admin-form__title'>Создание песни</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({values, touched, errors, handleSubmit, handleBlur, handleChange}) => {
                    return <form onSubmit={handleSubmit}>
                        <label htmlFor="song-name">Название песни</label> <br/>
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

                        <label htmlFor="song-artist">Исполнитель</label> <br/>
                        <Input name='artist'
                               className={`form__input`}
                               id="artist"
                               type="text"
                               autoComplete='off'
                               placeholder="Введите имя исполнителя"
                               value={values.artist}
                               onBlur={handleBlur}
                               onChange={handleChange}
                        />
                        <label htmlFor="song-artist">Обложка песни</label> <br/>
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
                        <label htmlFor="song-artist">Песня</label> <br/>
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
                        <label htmlFor="song-artist">Жанр</label> <br/>
                        <select className={`form__input`}
                                name='genre'
                                value={values.genre}
                                onChange={handleChange}>
                            <option value="" disabled>Выберите жанр</option>
                            {genres && genres.map(genre => (
                                <option key={genre._id} value={genre._id}>{genre.name}</option>
                            ))}
                        </select>
                        <button type="submit"
                                className="form__button form__button_login"
                        >Создать
                        </button>
                    </form>
                }}

            </Formik>
        </div>
    );
};

export default AdminSongForm;
