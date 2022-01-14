import {ActionCreator} from "redux";
import {PlayerAction} from "../../../redux/Actions/playerActions";

export const playMusic = (
    pause: boolean,
    playTrack: ActionCreator<PlayerAction>,
    pauseTrack: ActionCreator<PlayerAction>,
    audio?: HTMLAudioElement) => {
    if (pause) {
        playTrack();
        audio?.play();
    } else {
        pauseTrack();
        audio?.pause();
    }
};
