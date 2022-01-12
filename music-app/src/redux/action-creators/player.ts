import {SongType} from "../../config/types";
import {PlayerAction, PlayerActionsType} from "../Actions/playerActions";

export const playTrack = (): PlayerAction => {
    return { type: PlayerActionsType.PLAY };
};
export const pauseTrack = (): PlayerAction => {
    return { type: PlayerActionsType.PAUSE };
};
export const setDurationSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_DURATION, payload };
};
export const setVolumeSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_VOLUME, payload };
};
export const setCurrentTimeSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_CURRENT_TIME, payload };
};
export const setPlayingSong = (payload: SongType): PlayerAction => {
    return { type: PlayerActionsType.SET_PLAYBACK, payload };
};
