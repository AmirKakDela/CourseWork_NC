import {AlbumAction, AlbumActionsType} from "./albumAction";
import {Dispatch} from "redux";
import {url} from "../../config/config";
import axios from "axios";
import {AlbumType} from "../../config/types";

export function getAlbumsByRequest() {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${url}/api/album/allAlbums`, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch({ type: AlbumActionsType.SET_ALBUMS, payload: response.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function createAlbumByRequest(newAlbum: AlbumType) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.post(`${url}/api/album/create`, newAlbum, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch({ type: AlbumActionsType.SET_ALBUM, payload: response.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function updateAlbumByRequest(albumId: string, editAlbum: AlbumType) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.put(`${url}/api/album/update/${albumId}`, editAlbum, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch({ type: AlbumActionsType.SET_ALBUM, payload: response.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function deleteAlbumByRequest(albumId: string) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.delete(`${url}/api/album/delete/${albumId}`, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch({ type: AlbumActionsType.DELETE_ALBUM, payload: albumId });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getAlbumByIdRequest(albumId: string) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${url}/api/album/${albumId}`, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch({ type: AlbumActionsType.SET_ALBUM, payload: response.data });
        } catch (e) {
            console.log(e);
        }
    };
}
