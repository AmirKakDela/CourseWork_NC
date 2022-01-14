import React, {useState} from "react";
import "./song.scss";
import {Track} from "../../config/types";
import songDefault from "../../assets/imgs/song_default.jpg";
import Like from "./Like";
import {CaretRightFilled as PlayIcon, PauseOutlined as PauseIcon} from "@ant-design/icons";
import {useActions} from "../../hooks/useActions";
import {setPlayingSong} from "../../redux/action-creators/player";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {RootState} from "../../redux/Reducers/rootReducer";
import {playMusic} from "../Layout/Player/playMusic";

type PropsType = {
    song: Track,
    order: number,
}

const Song = (props: PropsType) => {
    const { song, order } = props;
    const { pause } = useTypedSelector((state: RootState) => state.player);
    const [songCover, setSongCover] = useState(song.cover);
    const { playSong, pauseSong, setPlayingSong } = useActions();

    function play() {
        setPlayingSong(song);
        if (pause) {
            playSong();
        } else {
            pauseSong();
        }
    }

    const onImageError = () => {
        setSongCover(songDefault);
    };

    return (
        <div className="song">
            <div className="song__main">
                <div className="song__first">
                    <h3 className="song__number">{order}</h3>
                    <div className="song__play"
                         onClick={play}>
                        {pause
                            ? <PlayIcon/>
                            : <PauseIcon/>
                        }
                    </div>
                </div>
                <img src={songCover || songDefault}
                     alt="Song Picture"
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
