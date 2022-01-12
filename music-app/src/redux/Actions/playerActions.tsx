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
    | SetCurrentTimeAction;
