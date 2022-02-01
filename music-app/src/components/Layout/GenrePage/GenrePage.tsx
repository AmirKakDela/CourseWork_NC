import React, {useEffect, useState} from 'react';
import './genrePage.scss';
import {useParams} from "react-router-dom";
import API from "../../../API/API";
import {GenreType} from "../../../config/types";
import MoonLoader from "react-spinners/MoonLoader";


const GenrePage: React.FC = () => {
    const urlParams = useParams();
    const [genre, setGenre] = useState<GenreType>({
        _id: '',
        color: 'black',
        name: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(urlParams.id)
        if (urlParams.id) {
            API.getGenre(urlParams.id).then(response => {
                setGenre(response.data);
                setLoading(false);
            }).catch(response => {
                setLoading(true)
            })
        }
    }, [])

    return (

        <>
            {loading ? <MoonLoader/> :
                <div className="info genre-page">
                    <div className="info__header genre-page__header"
                         style={{backgroundColor: genre.color}}
                    >
                        <h1 className="desc__name genre-page__name">{genre.name}</h1>
                    </div>
                    <div className="info__main">
                        <h2 className="main__title">Плейлисты</h2>
                        <div className="main__slider">
                            {/*<AlbumCard/>*/}
                            {/*<AlbumCard/>*/}
                            {/*<AlbumCard/>*/}
                        </div>
                        <h2 className="main__title">Песни</h2>
                        <div className="main__songs">

                        </div>
                    </div>
                </div>
            }
        </>
    )
        ;
};

export default GenrePage;