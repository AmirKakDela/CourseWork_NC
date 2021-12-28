import {Album} from "../../config/types";

export enum AlbumActionsType {
    SET_ALBUM = 'SET_ALBUM',
    SET_ALBUMS = 'SET_ALBUMS',
    SET_POPULAR_ALBUMS = 'SET_POPULAR_ALBUMS',
    DELETE_ALBUM = 'DELETE_ALBUM',
    GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST',
    GET_POPULAR_ALBUMS_REQUEST = 'GET_POPULAR_ALBUMS_REQUEST',
    CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST',
    UPDATE_ALBUM_REQUEST = 'UPDATE_ALBUM_REQUEST',
    DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST',
}

export type AlbumAction = {
    type: AlbumActionsType,
    payload: Album[] | Album | string | null | Promise<any>,
}
