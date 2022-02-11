import {PlaylistType} from "../../config/types";

export enum PlaylistActionsType {
    SET_PLAYLIST = 'SET_PLAYLIST',
    SET_PLAYLISTS = 'SET_PLAYLISTS',
    UPDATE_PLAYLIST = 'UPDATE_PLAYLIST',
    ADD_SONGS_TO_PLAYLISTS = 'ADD_SONGS_TO_PLAYLISTS',
    DELETE_PLAYLIST = 'DELETE_PLAYLIST',
}

export type PlaylistActions = {
    type: PlaylistActionsType,
    payload: PlaylistType[] | PlaylistType | string | null | Promise<any>,
}
