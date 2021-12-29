import {Album} from "../../config/types";

export enum AlbumActionsType {
    SET_ALBUM = 'SET_ALBUM',
    SET_ALBUMS = 'SET_ALBUMS',
    SET_POPULAR_ALBUMS = 'SET_POPULAR_ALBUMS',
    DELETE_ALBUM = 'DELETE_ALBUM',
}

export type AlbumAction = {
    type: AlbumActionsType,
    payload: Album[] | Album | string | null | Promise<any>,
}
