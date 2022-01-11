import {MenuUnfoldOutlined, PauseCircleFilled, PlayCircleFilled, SoundOutlined, StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {RootState} from "../../../redux/Reducers/rootReducer";
import "./Player.scss";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import SongProgress from "./SongProgress";

let audio: HTMLAudioElement;
const audioSrcDefault = "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3";

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
        if (playback) {
            audio.src = playback?.song;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDurationSong(audio.duration);
            };
            audio.ontimeupdate = () => {
                setCurrentTimeSong(Math.ceil(audio.currentTime));
            };
        }
    };

    const formattedTime = (time: number) => {
        return new Date((time + new Date().getTimezoneOffset() * 60) * 1000)
            .toLocaleTimeString()
            .replace(/^00:/, '');
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

    const changeVolume = (value: number) => {
        audio.volume = value / 100;
        setVolumeSong(value);
    };
    const changeCurrentTime = (value: number) => {
        audio.currentTime = value;
        setCurrentTimeSong(value);
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
                    <SongProgress
                        begin={currentTime}
                        end={duration}
                        current={formattedTime(currentTime)}
                        finish={formattedTime(duration)}
                        onChange={changeCurrentTime}
                    />
                </div>
            </div>
            <div className="player__control-button-bar">
                <MenuUnfoldOutlined style={{ fontSize: "14px", color: "#fff" }}/>
                <SoundOutlined style={{ fontSize: "14px", color: "#fff" }}/>
                <div className="player__control-button-bar__volume">
                    <SongProgress
                        begin={volume}
                        end={100}
                        onChange={changeVolume}
                    />
                </div>
            </div>
        </div>
    );
}
