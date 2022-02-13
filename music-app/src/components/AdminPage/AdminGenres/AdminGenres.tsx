import React, {useEffect, useState} from 'react';
import GenreAPI from "../../../API/GenreAPI";
import {GenreType} from "../../../config/types";
import {Link} from "react-router-dom";
import Genre from "../../Genre/Genre";

const AdminGenres: React.FC = () => {
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GenreAPI.getAllGenre().then(data => {
            setGenres(data)
            setIsLoading(false);
        })
    }, [])

    return (
        <>
            {isLoading ? <h1>isLoading</h1> :
                <>
                    <Link to="/admin/genre/create">
                        <button className="form__button admin__button">Добавить новый жанр</button>
                    </Link>

                    {genres && genres.map((genre, index) => (
                        <div className="admin-song__wrap" key={genre._id}>
                            <h1>{index + 1}</h1>
                            <Genre genre={genre}/>
                        </div>
                    ))}
                </>
            }
        </>
    );
};

export default AdminGenres;
