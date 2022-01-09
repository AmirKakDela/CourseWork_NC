import {MenuUnfoldOutlined, PauseCircleFilled, PlayCircleFilled, SoundOutlined, StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {Slider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {url} from "../../../config/config";
import {pauseTrack, playTrack, setActiveTrack, setCurrentTime, setDuration, setVolume} from "../../../redux/Actions/playerActions";
import "./Player.scss";
import SongProgress from "./SongProgress";

let song: HTMLAudioElement;

function formatter(value: number | undefined) {
    return `${value}%`;
}

const marks = {
    0: "0",
    100: "100"
};

export function Player() {
    const track = {
        _id: "61acd1126d28560bdac450f4",
        name: "Вождь",
        artist: "Mops",
        cover: "lala.jpg",
        song: "lala.mp3",
        duration: "123",
        genre: "hip-pop"
    };
    const dispatch = useDispatch();
    const { playback, volume, currentTime, pause, duration } = useSelector((state: RootState) => state.player);
    const pauseSong = dispatch(pauseTrack);
    const playSong = dispatch(playTrack);
    // const setVolumeSong = dispatch(setVolume);
    // const setCurrentTimeSong = dispatch(setCurrentTime);
    // const setDurationSong = dispatch(setDuration);
    // const setPlayback = dispatch(setActiveTrack);

    useEffect(() => {
        if (!song) {
            song = new Audio();
        } else {
            //setSongParams();
            playMusic();
        }
    }, [playback]);

    // const setSongParams = () => {
    //     if (song) {
    //         song.src = `${url}${playback?.song}`;
    //         song.volume = volume / 100;
    //         song.onloadedmetadata = () => {
    //             setDurationSong(Math.ceil(song.duration));
    //         };
    //         song.ontimeupdate = () => {
    //             setCurrentTimeSong(Math.ceil(song.currentTime));
    //         }
    //     }
    // };
    const playMusic = () => {
        if (pause) {
            playTrack();
            song.play();
        } else {
            pauseTrack();
            song.pause();
        }
    };
    //
    // const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     song.volume = Number(e.target.value) / 100;
    //     setVolumeSong(Number(e.target.value));
    // };
    // const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     song.currentTime = Number(e.target.value);
    //     setCurrentTimeSong(Number(e.target.value));
    // };
    //
    // if (!playback) {
    //     return null;
    // }

    return (
        <div className="player">
            <div className="player__now-playing">
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </div>
            <div className="player__controls">
                <div  className="player__controls__icons">
                    <StepBackwardOutlined style={{ fontSize: '16px', color: '#fff' }}/>
                    <div onClick={playMusic} className="player__controls__playpause">
                        {pause
                            ? <PlayCircleFilled style={{ fontSize: '32px', color: '#fff' }}/>
                            : <PauseCircleFilled style={{ fontSize: '32px', color: '#fff' }}/>
                        }
                    </div>
                    <StepForwardOutlined style={{ fontSize: '16px', color: '#fff' }}/>
                </div>
                <div className="player__controls__timeline">
                    <Slider trackStyle={{ color: '#b3b3b3', backgroundColor: '#535353' }}
                            handleStyle={{display: 'none'}}
                            min={0}
                            defaultValue={0}
                            max={100}
                            tooltipVisible={false}
                            onChange={() => {
                    }}/>
                </div>
            </div>
            <div className="player__control-button-bar">
                <MenuUnfoldOutlined style={{ fontSize: '14px', color: '#fff' }} />
                <SoundOutlined style={{ fontSize: '14px', color: '#fff' }}/>
                <div className="player__control-button-bar__volume">
                    <Slider trackStyle={{ color: '#b3b3b3', backgroundColor: '#535353' }}
                            handleStyle={{display: 'none'}}
                            min={0}
                            defaultValue={50}
                            max={100}
                            tooltipVisible={false}
                            onChange={() => {}}/>
                </div>
            </div>
        </div>
    );
}
