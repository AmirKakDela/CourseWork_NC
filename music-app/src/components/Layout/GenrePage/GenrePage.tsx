import React, {useEffect} from 'react';
import './genrePage.scss';
import {useParams} from "react-router-dom";


const GenrePage = () => {

    const urlParams = useParams();

    useEffect(() => {
            console.log(urlParams.id)
        if (urlParams.id) {
            // api.someAPI
        }
    }, [])
    
    return (
        <div className="info genre-page">
            <div className="info__header genre-page__header"
                 style={{backgroundColor: '#66f542'}}
            >
                <h1 className="desc__name genre-page__name">Хипхоп</h1>
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
    );
};

export default GenrePage;