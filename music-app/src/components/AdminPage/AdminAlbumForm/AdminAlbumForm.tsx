import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import {Input} from "antd";
import {ArtistType, SongType} from "../../../config/types";
import * as yup from "yup";
import {validationRulesAlbum} from "../../../config/ValidationRules";
import {useParams} from "react-router-dom";
import ArtistAPI from "../../../API/ArtistAPI";
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
    name: "",
    artist: "",
    songs: [],
    cover: ""
};

const validateSchema = yup.object().shape(validationRulesAlbum);

export const AdminAlbumForm: React.FC = () => {
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const [songs, setSongs] = useState<SongType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    const onSubmit = (data: AlbumTypeWithoutId) => {
        setIsSubmit(true);
        console.log("onSubmit", data);
        data.artist = artists.find(artist => artist.name === data.artist)?.name || "";
        const formData = new FormData();
        for (let key in data) {
            // @ts-ignore
            formData.append(key, data[key]);
        }
        AlbumAPI.createAlbum(formData).then(res => {
            res.data.message && dispatch(setError(res.data.message));
        })
            .finally(() => {
            setIsSubmit(false);
        });
    };

    useEffect(() => {
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data);
        });
    }, []);

    useEffect(() => {
        if (params.id) {
            AlbumAPI.getAlbumById(params.id).then((data: any) => {
                initialValues.name = data.album.name;
                initialValues.artist = data.album.artist;
                initialValues.cover = data.album.cover;
                initialValues.songs = data.album.songs;
            });
            setIsLoading(false);
        }
    });

    function onSubmit(data: AlbumFormData) {
        setIsSubmit(true);
        console.log("onSubmit", data);
        data.artist = artists.find(artist => artist._id === data.artist)?.name || "";
        if (data.cover) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                AlbumAPI.createAlbum({
                    ...data,
                    cover: fileReader.result,
                }).then(res => {
                    res?.data?.message && dispatch(setError(res.data.message));
                })
                    .finally(() => {
                        setIsSubmit(false);
                    });
            };
            fileReader.readAsDataURL(data.cover as Blob);
        } else {
            if (params.id) {
                AlbumAPI
                    .editAlbum(params.id, data)
                    .then(res => {
                        res?.data?.message && dispatch(setError(res.data.message));
                    })
                    .finally(() => setIsSubmit(false));
            } else {
                AlbumAPI
                    .createAlbum(data)
                    .then(res => {
                        res?.data?.message && dispatch(setError(res.data.message));
                    })
                    .finally(() => setIsSubmit(false));
            }
        }
    }


    function onArtistChange(artist: string, setFieldValue: (field: string, value: any) => void) {
        console.log(artist);
        setFieldValue(
            "songs",
            []
        );
        ArtistAPI
            .getAllArtistsSongs(artist)
            .then(data => {
                console.log("getAllArtistsSongs", data);
                setSongs(data);
            });

    }

    return (
        <>
            {isLoading
                ? <h1>IsloadIng</h1>
                : <div className="admin-form">
                    {params.id
                        ? <h1 className="admin-form__title">Редактирование альбома</h1>
                        : <h1 className="admin-form__title">Создание альбома</h1>
                    }
                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validateSchema}
                    >
                        {({
                              values,
                              touched,
                              errors,
                              handleSubmit,
                              handleBlur,
                              handleChange,
                              setFieldValue
                          }) => {
                            return <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Название альбома</label> <br/>
                                <Input name="name"
                                       className={`form__input`}
                                       id="name"
                                       type="text"
                                       autoComplete="off"
                                       placeholder="Введите название альбома"
                                       value={values.name}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                                {errors.name && touched.name && <p className="form__error_text">{errors.name}</p>}

                                <label htmlFor="artist">Исполнитель</label> <br/>
                                <select className={`form__input`}
                                        name="artist"
                                        id="artist"
                                        value={values.artist}
                                        // defaultValue={initialValues.artist}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldValue(
                                                "songs",
                                                this || getSongs( e.target.value)
                                            );
                                        }}>
                                    <option value="" disabled>Выберите исполнителя</option>
                                    {artists && artists.map(artist => (
                                        <option key={artist._id}
                                                value={artist._id}
                                            // selected={initialValues.artist === values.artist}
                                        >
                                            {artist.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.artist && touched.artist &&
                                    <p className="form__error_text">{errors.artist}</p>}

                                <label htmlFor="cover">Обложка альбома</label> <br/>
                                <Input name="cover"
                                       className={`form__input form__input_upload`}
                                       id="cover"
                                       type="file"
                                       autoComplete="off"
                                       placeholder="Загрузите обложку для альбома"
                                       onBlur={handleBlur}
                                    // defaultValue={initialValues.cover}
                                       onChange={(e) =>
                                           setFieldValue(
                                               "cover",
                                               e.target.files && e.target.files[0]
                                           )}
                                />
                                {errors.cover && touched.cover && <p className="form__error_text">{errors.cover}</p>}

                                <label htmlFor="songs">Песни</label> <br/>
                                <select className={`form__input`}
                                        name="songs"
                                        id="songs"
                                        value={values.songs}
                                        onChange={handleChange}
                                        multiple
                                >
                                    <option value="" disabled>Выберите песни</option>
                                    {songs?.length && songs.map(song => (
                                        <option key={song._id}
                                                value={song._id}
                                        >
                                            {song.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.songs && touched.songs && <p className="form__error_text">{errors.songs}</p>}

                                <button type="submit" disabled={isSubmit}
                                        className="form__button"
                                >{isSubmit ? 'Загрузка' : 'Создать'}
                                </button>
                            </form>;
                        }}
                    </Formik>
                </div>
            }
        </>
    );
};
