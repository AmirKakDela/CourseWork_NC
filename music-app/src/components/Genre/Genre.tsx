import React from 'react';
import './genre.css'
import {colors} from '../../config';
import {Link} from "react-router-dom";

type PropsType = {
    genreName: string
}

const Genre: React.FC<PropsType> = (props) => {
    const getRandomColor = (colors: Array<string>) => {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    return (
        <Link to={`/genre/${props.genreName.toLowerCase()}`}>
            <div className="genre" style={{backgroundColor: getRandomColor(colors)}}>
                <span>{props.genreName}</span>
            </div>
        </Link>
    );
};

export default Genre;