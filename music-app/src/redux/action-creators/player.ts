import {Track} from "../../config/types";
import {PlayerAction, PlayerActionsType} from "../Actions/playerActions";

export const playSong = (): PlayerAction => {
    return { type: PlayerActionsType.PLAY };
};
export const pauseSong = (): PlayerAction => {
    return { type: PlayerActionsType.PAUSE };
};
export const setDurationSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_DURATION, payload };
};
export const setVolumeSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_VOLUME, payload };
};
export const setPlayingSong = (payload: Track): PlayerAction => {
    return { type: PlayerActionsType.SET_PLAYBACK, payload };
};
