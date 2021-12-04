import React from 'react';
import './genre.css'
import {colors} from '../../config';
import {Link} from "react-router-dom";

type PropsType = {
    genreName: string
}

const Genre: React.FC<PropsType> = (props) => {
    const getRandomColor = (colors: Array<string>) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return color
    }
    return (
        <Link to={`/genre/${props.genreName}`}>
            <div className="genre" style={{backgroundColor: getRandomColor(colors)}}>
                <span>{props.genreName}</span>
                {/*<img src="" className="genre__img"/>*/}
            </div>
        </Link>
    );
};

export default Genre;