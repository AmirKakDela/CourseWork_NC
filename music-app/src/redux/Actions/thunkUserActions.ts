import axios from "axios";
import {
    likeLoading,
    likePlaylistLoading,
    setAuthError,
    setCurrentUser,
    setUserLikedPlaylists,
    setUserPlaylists,
    toggleLikePlaylist,
    toggleLikeSong,
    UserActionTypes,
    userLoading
} from "./userActions";
import {Dispatch} from "redux";
import {AuthorizationHeaderConfig, url} from "../../config/config";
import {ErrorType, PlaylistType, SongType} from "../../config/types";
import {ErrorActionType, setError} from "./errorAction";
import {AlbumActionsType} from "./albumAction";


export const signup = (email: string, password: string, name: string) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        try {
            await axios.post(`${url}/api/auth/register`, {email, password, name});
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        try {
            const response = await axios.post(`${url}/api/auth/login`, {email, password})
            const {userId, userName, isAdmin, playlists, likedPlaylists, likedSongs} = response.data
            dispatch(setCurrentUser({
                userId,
                userName,
                isAdmin,
                likedSongs,
                likeLoading: {status: false, songId: ''},
                playlists,
                likedPlaylists,
                likePlaylistLoading: {status: false, playlistId: ''},
            }))
            dispatch(setAuthError(null))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
        }
    }
}

export const auth = () => {
    return async (dispatch: Dispatch<UserActionTypes | ErrorActionType>) => {
        dispatch(userLoading(true))
        try {
            console.log(localStorage.getItem('token'))
            if (localStorage.getItem('token') === null) return dispatch(userLoading(false))
            const response = await axios.get(`${url}/api/auth/auth`, AuthorizationHeaderConfig)
            const {userId, userName, isAdmin, playlists, likedPlaylists, likedSongs} = response.data
            dispatch(setCurrentUser({
                userId,
                userName,
                isAdmin,
                likedSongs,
                likeLoading: {status: false, songId: ''},
                playlists,
                likedPlaylists,
                likePlaylistLoading: {status: false, playlistId: ''},
            }));
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            const u = e as ErrorType
            dispatch(setError(u.response.data.message))
            dispatch(userLoading(false))
            localStorage.removeItem('token');
        }
    }
}

// export const thunkUserLikedSongs = () => {
//     return async (dispatch: Dispatch<UserActionTypes>) => {
//         dispatch(libraryLoading(true))
//         try {
//             const response = await axios.get(`${url}/api/song/user/liked-songs`, AuthorizationHeaderConfig)
//             dispatch(setUserLikedSongs(response.data))
//         } catch (e) {
//             dispatch(libraryLoading(false))
//             const u = e as ErrorType
//             dispatch(setAuthError(u.response.data.message))
//         }
//     }
// }

export const thunkToggleLikeSong = (song: SongType) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        dispatch(likeLoading({status: true, songId: song._id}))
        try {
            await axios.put(`${url}/api/song/user/like/${song._id}`, '', AuthorizationHeaderConfig)
            dispatch(toggleLikeSong(song))
            dispatch(likeLoading({status: false, songId: ''}))
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
            dispatch(likeLoading({status: false, songId: ''}))
        }
    }
}

export const thunkUserPlaylists = (userId: string) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        const response = await axios.get(`${url}/api/playlist/user/${userId}`, AuthorizationHeaderConfig)
        dispatch(setUserPlaylists(response.data.playlists));
    }
}

export const thunkUserLikedPlaylists = (userId: string) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        try {
            const response = await axios.get(`${url}/api/playlist/user/${userId}/liked-playlists`, AuthorizationHeaderConfig)
            dispatch(setUserLikedPlaylists(response.data.playlists))
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
        }
    }
}

export const thunkToggleLikePlaylist = (playlist: PlaylistType) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        dispatch(likePlaylistLoading({status: true, playlistId: playlist._id}))
        try {
            await axios.put(`${url}/api/playlist/user/like/${playlist._id}`, '', AuthorizationHeaderConfig)
            dispatch(toggleLikePlaylist(playlist))
            dispatch(likePlaylistLoading({status: false, playlistId: ''}))
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
            dispatch(likePlaylistLoading({status: false, playlistId: ''}))
        }
    }
}
