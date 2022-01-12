import {SongType} from "../../config/types";

export enum SongActionTypes {
    FETCH_SONGS = 'FETCH_SONGS',
    FETCH_SONGS_ERROR = 'FETCH_SONGS_ERROR',
}

type FetchTracksAction = {
    type: SongActionTypes.FETCH_SONGS;
    payload: SongType[]
}

type FetchTracksErrorAction = {
    type: SongActionTypes.FETCH_SONGS_ERROR;
    payload: string
}

export type SongAction = FetchTracksAction | FetchTracksErrorAction;
