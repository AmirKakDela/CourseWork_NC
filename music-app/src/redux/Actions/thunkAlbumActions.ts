import {AlbumAction, AlbumActionsType} from "./albumAction";
import {Dispatch} from "redux";
import {url} from "../../config/config";
import axios from "axios";
import {Album} from "../../config/types";

export function getAlbumsByRequest() {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await axios.get(`${url}/api/album/all`);
        dispatch({ type: AlbumActionsType.GET_ALBUMS_REQUEST, payload: response.data });
    };
}

export function createAlbumByRequest(newAlbum: Album) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await axios.post(`${url}/api/album/create`, newAlbum);
        dispatch({ type: AlbumActionsType.CREATE_ALBUM_REQUEST, payload: response.data });
    };
}

export function updateAlbumByRequest(albumId: string, editAlbum: Album) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await axios.put(`${url}/api/album/update/${albumId}`, editAlbum);
        dispatch({ type: AlbumActionsType.UPDATE_ALBUM_REQUEST, payload: response.data });
    };
}

export function deleteAlbumByRequest(albumId: string) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await axios.delete(`${url}/api/album/delete/${albumId}`);
        dispatch({ type: AlbumActionsType.DELETE_ALBUM_REQUEST, payload: response.data &&  'Альбом успешно удален' });
    };
}

export function getAlbumByIdRequest(albumId: string) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await axios.get(`${url}/api/album/${albumId}`);
        dispatch({ type: AlbumActionsType.SET_ALBUM, payload: response.data });
    };
}
