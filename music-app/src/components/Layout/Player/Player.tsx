import {MenuUnfoldOutlined, PauseCircleFilled, PlayCircleFilled, SoundOutlined, StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {RootState} from "../../../redux/Reducers/rootReducer";
import "./Player.scss";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import SongProgress from "./SongProgress";

let audio: HTMLAudioElement;

export function Player() {

    const { playback, volume, currentTime, pause, duration } = useTypedSelector((state: RootState) => state.player);
    const { playTrack, setPlayingSong, setCurrentTimeSong, setDurationSong, setVolumeSong, pauseTrack } = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            setSongParams();
            playMusic();
        }
    }, [playback]);

    const setSongParams = () => {
        if (audio) {
            audio.src = playback?.song as string;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDurationSong(Math.ceil(audio.duration));
            };
            audio.ontimeupdate = () => {
                setCurrentTimeSong(Math.ceil(audio.currentTime));
            };
        }
    };
    const playMusic = () => {
        if (pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolumeSong(Number(e.target.value));
    };
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTimeSong(Number(e.target.value));
    };

    return (
        <div className="player">
            <div className="player__now-playing">
                <div>{playback?.name}</div>
                <div>{playback?.artist}</div>
            </div>
            <div className="player__controls">
                <div className="player__controls__icons">
                    <StepBackwardOutlined style={{ fontSize: "16px", color: "#fff" }}/>
                    <div onClick={playMusic} className="player__controls__playpause">
                        {pause
                            ? <PlayCircleFilled style={{ fontSize: "32px", color: "#fff" }}/>
                            : <PauseCircleFilled style={{ fontSize: "32px", color: "#fff" }}/>
                        }
                    </div>
                    <StepForwardOutlined style={{ fontSize: "16px", color: "#fff" }}/>
                </div>
                <div className="player__controls__timeline">
                    <SongProgress begin={currentTime} end={duration} onChange={changeCurrentTime}/>
                </div>
            </div>
            <div className="player__control-button-bar">
                <MenuUnfoldOutlined style={{ fontSize: "14px", color: "#fff" }}/>
                <SoundOutlined style={{ fontSize: "14px", color: "#fff" }}/>
                <div className="player__control-button-bar__volume">
                    <SongProgress begin={volume} end={100} onChange={changeVolume}/>
                </div>
            </div>
        </div>
    );
}
