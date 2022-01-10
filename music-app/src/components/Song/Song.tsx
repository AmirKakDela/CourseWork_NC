import React, {useState} from 'react';
import './song.scss';
import {SongType} from "../../config/types";
import songDefault from '../../assets/imgs/song_default.jpg'
import Like from "./Like";
import {CaretRightFilled, PauseOutlined} from "@ant-design/icons";
import {useActions} from "../../hooks/useActions";
import {setPlayingSong} from "../../redux/action-creators/player";

type PropsType = {
    song: SongType,
    number: number,
    active?: boolean;
}

const Song = (props: PropsType) => {
    const {song, active = false} = props;
    const [songCover, setSongCover] = useState(song.cover);
    const {playTrack, pauseTrack, setPlayingSong} = useActions();

    const play = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setPlayingSong(song);
        playTrack();
    }

    const onImageError = () => {
        setSongCover(songDefault)
    }

    return (
        <div className="song">
            <div className="song__main">
                <div className="song__first">
                    <h3 className="song__number">{props.number}</h3>
                    <div className="song__play" onClick={play}>
                        {!active
                            ? <CaretRightFilled/>
                            : <PauseOutlined/>
                        }
                    </div>
                </div>
                <img src={songCover} alt="Song Picture"
                     className="song__img"
                     onError={onImageError}
                />
                <div className="song__name_wrap">
                    <h3 className="song__name">{song.name}</h3>
                    <h3 className="song__artist">{song.artist}</h3>
                </div>
            </div>
            <div className="song__other">
                <div className="song__like">
                        <Like song={song}/>
                </div>
                <h3 className="song__duration">
                    {song.duration}
                </h3>
            </div>
        </div>
    );
};

export default Song;
