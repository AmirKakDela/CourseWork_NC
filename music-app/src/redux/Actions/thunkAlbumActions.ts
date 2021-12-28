import {AlbumAction, AlbumActionsType} from "./albumAction";
import {Dispatch} from "redux";
import {url} from "../../config/config";
import axios from "axios";

export function getAlbums() {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await fetch(`${url}/api/album/all`, { method: "GET" });
        const json = response.json();
        dispatch({ type: AlbumActionsType.GET_ALBUMS_REQUEST, payload: json });
    };
}

export function createAlbum(_id: string, name: string, artist: string, songs: Array<string>, cover: string) {
    return async (dispatch: Dispatch<AlbumAction>) => {
        const response = await axios.post(`${url}/api/album/create`, { _id, name, artist, songs, cover });
        dispatch({ type: AlbumActionsType.CREATE_ALBUM_REQUEST, payload: response.data });
    };
}
