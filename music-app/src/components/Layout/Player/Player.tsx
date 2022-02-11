import {MenuUnfoldOutlined, PauseCircleFilled, PlayCircleFilled, SoundOutlined, StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {RootState} from "../../../redux/Reducers/rootReducer";
import "./Player.scss";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import SongProgress from "./SongProgress";
import {formattedTime} from "./player.untils";

const audio: HTMLAudioElement = new Audio();

export function Player() {
    const { playback, volume, pause, duration } = useTypedSelector((state: RootState) => state.player);
    const { playSong, setDurationSong, setVolumeSong, pauseSong } = useActions();
    const [playerTime, setPlayerTime] = useState(0);

    useEffect(() => {
        if (pause) {
            audio.pause();
        } else if (audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA || audio.readyState === HTMLMediaElement.HAVE_FUTURE_DATA) {
            audio.play();
        }
    }, [pause]);

    useEffect(() => {
        setSongParams();
    }, [playback]);

    const setSongParams = () => {
        if (playback) {
            audio.src = playback?.song;
            audio.volume = volume / 100;
            audio.autoplay = false;
            audio.loop = true;
            audio.onloadedmetadata = () => {
                setDurationSong(audio.duration);
            };
            audio.oncanplay = () => {
                if (!pause) {
                    audio.play();
                }
            };
            audio.ontimeupdate = () => {
                setPlayerTime(audio.currentTime);
            };
        }
    };

    const onSwitchPlay = () => {
        if (pause) {
            playSong();
        } else {
            pauseSong();
        }
    };

    const changeVolume = (value: number) => {
        audio.volume = value / 100;
        setVolumeSong(value);
    };

    const changeCurrentTime = (value: number) => {
        audio.currentTime = value;
        setPlayerTime(value);
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
                    <div onClick={onSwitchPlay} className="player__controls__playpause">
                        {pause
                            ? <PlayCircleFilled style={{ fontSize: "32px", color: "#fff" }}/>
                            : <PauseCircleFilled style={{ fontSize: "32px", color: "#fff" }}/>
                        }
                    </div>
                    <StepForwardOutlined style={{ fontSize: "16px", color: "#fff" }}/>
                </div>
                <div className="player__controls__timeline">
                    <SongProgress
                        begin={playerTime}
                        end={duration}
                        current={formattedTime(playerTime)}
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
