import {SongType} from "../../config/types";

export enum PlayerActionsType {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_PLAYBACK = "SET_PLAYBACK",
    SET_VOLUME = "SET_VOLUME",
    SET_DURATION = "SET_DURATION",
}

type PlayAction = {
    type: PlayerActionsType.PLAY
}
type PauseAction = {
    type: PlayerActionsType.PAUSE
}
type SetPlaybackAction = {
    type: PlayerActionsType.SET_PLAYBACK,
    payload: SongType;
}
type SetDurationAction = {
    type: PlayerActionsType.SET_DURATION,
    payload: number;
}
type SetVolumeAction = {
    type: PlayerActionsType.SET_VOLUME,
    payload: number;
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetPlaybackAction
    | SetDurationAction
    | SetVolumeAction;
