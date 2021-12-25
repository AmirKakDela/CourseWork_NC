import React from 'react';
import './song.scss';
import {SongType} from "../../config/types";

type PropsType = {
    song: SongType
}

const Song = (props: PropsType) => {
    return (
        <div className="song">
            <h1 className="song__name">{props.song.artist} - {props.song.name} </h1>
        </div>
    );
};

export default Song;