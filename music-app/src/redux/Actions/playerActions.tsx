import {SongType} from "../../config/types";

export enum PlayerActionsType {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_PLAYBACK = "SET_PLAYBACK",
    SET_VOLUME = "SET_VOLUME",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_DURATION = "SET_DURATION",
}

interface PlayAction {
    type: PlayerActionsType.PLAY
}
interface PauseAction {
    type: PlayerActionsType.PAUSE
}
interface SetPlaybackAction {
    type: PlayerActionsType.SET_PLAYBACK,
    payload: SongType;
}
interface SetDurationAction {
    type: PlayerActionsType.SET_DURATION,
    payload: number;
}
interface SetVolumeAction {
    type: PlayerActionsType.SET_VOLUME,
    payload: number;
}
interface SetCurrentTimeAction {
    type: PlayerActionsType.SET_CURRENT_TIME,
    payload: number;
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetPlaybackAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction


export const playTrack = (): PlayerAction => {
    return { type: PlayerActionsType.PLAY };
};
export const pauseTrack = (): PlayerAction => {
    return { type: PlayerActionsType.PAUSE };
};
export const setDuration = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_DURATION, payload };
};
export const setVolume = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_VOLUME, payload };
};
export const setCurrentTime = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_CURRENT_TIME, payload };
};
export const setActiveTrack = (payload: SongType): PlayerAction => {
    return { type: PlayerActionsType.SET_PLAYBACK, payload };
};
