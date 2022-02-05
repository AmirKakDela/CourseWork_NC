import axios from "axios";
import {
    libraryLoading,
    likeLoading,
    setAuthError,
    setCurrentUser,
    setUserLikedSongs,
    toggleLikeSong,
    UserActionTypes,
    userLoading
} from "./userActions";
import {Dispatch} from "redux";
import {AuthorizationHeaderConfig, url} from "../../config/config";
import {ErrorType, SongType} from "../../config/types";


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
            const {userId, userName, isAdmin} = response.data
            dispatch(setCurrentUser({userId, userName, isAdmin, likedSongs: []}))
            dispatch(setAuthError(null))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
        }
    }
}

export const auth = () => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        dispatch(userLoading(true))
        try {
            console.log(localStorage.getItem('token'))
            if (localStorage.getItem('token') === null) return dispatch(userLoading(false))
            const response = await axios.get(`${url}/api/auth/auth`, AuthorizationHeaderConfig)
            const {userId, userName, isAdmin} = response.data
            dispatch(setCurrentUser({userId, userName, isAdmin, likedSongs: []}));
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log('ошибка при авторизации на фронте', e)
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
            localStorage.removeItem('token');
        }
    }
}

export const thunkUserLikedSongs = () => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        dispatch(libraryLoading(true))
        try {
            const response = await axios.get(`${url}/api/song/user/liked-songs`, AuthorizationHeaderConfig)
            dispatch(setUserLikedSongs(response.data))
        } catch (e) {
            dispatch(libraryLoading(false))
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
        }
    }
}

export const thunkToggleLikeSong = (song: SongType) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        dispatch(likeLoading(true))
        try {
            await axios.put(`${url}/api/song/user/like/${song._id}`, '', AuthorizationHeaderConfig)
            dispatch(toggleLikeSong(song))
            dispatch(likeLoading(false))
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
            dispatch(likeLoading(false))
        }
    }
}
