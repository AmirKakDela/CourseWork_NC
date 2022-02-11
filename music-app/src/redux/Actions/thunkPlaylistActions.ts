import {PlaylistActions, PlaylistActionsType} from "./playlistActions";
import {Dispatch} from "redux";
import {url} from "../../config/config";
import axios from "axios";
import {PlaylistType} from "../../config/types";

export function getPlaylistsByRequest() {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        const response = await axios.get(`${url}/api/playlist/all`);
        dispatch({ type: PlaylistActionsType.SET_PLAYLISTS, payload: response.data });
    };
}

export function createPlaylistByRequest(newPlaylist: PlaylistType) {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        const response = await axios.post(`${url}/api/playlist/create`, newPlaylist);
        dispatch({ type: PlaylistActionsType.SET_PLAYLIST, payload: response.data });
    };
}

export function updatePlaylistByRequest(playlistId: string, editPlaylist: PlaylistType) {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        const response = await axios.put(`${url}/api/playlist/update/${playlistId}`, editPlaylist);
        dispatch({ type: PlaylistActionsType.SET_PLAYLIST, payload: response.data });
        console.log(response)
    };
}

export function deletePlaylistByRequest(playlistId: string) {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        const response = await axios.delete(`${url}/api/playlist/delete/${playlistId}`);
        dispatch({ type: PlaylistActionsType.DELETE_PLAYLIST, payload: playlistId });

    };
}

export function getPlaylistByIdRequest(playlistId: string) {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        const response = await axios.get(`${url}/api/playlist/${playlistId}`);
        dispatch({ type: PlaylistActionsType.SET_PLAYLIST, payload: response.data });
    };
}

export function addTrackToPlaylistByRequest(playlistId: string, trackId: string) {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        console.log(trackId)
        const response = await axios.put(`${url}/api/playlist/addTracks/${playlistId}`, { song: trackId});
        dispatch({type: PlaylistActionsType.SET_PLAYLIST, payload: response.data})
    }
}

export function deleteTrackFromPlaylistByRequest(playlistId: string, trackId: string) {
    return async (dispatch: Dispatch<PlaylistActions>) => {
        console.log(trackId)
        const response = await axios.put(`${url}/api/playlist/deleteTrack/${playlistId}`, { song: trackId});
        dispatch({type: PlaylistActionsType.SET_PLAYLIST, payload: response.data})
    }
}