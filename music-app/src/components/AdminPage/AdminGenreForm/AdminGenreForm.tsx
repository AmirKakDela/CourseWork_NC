import React, {useEffect} from 'react';
import GenreAPI from "../../../API/GenreAPI";
import {useParams} from "react-router-dom";

const AdminGenreForm: React.FC = () => {
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            GenreAPI.getGenre(params.id).then(data => {
                console.log(data)
            })
        }
    }, [])
    return (
        <div>

        </div>
    );
};

export default AdminGenreForm;
