import axios from "axios";
import {
    likeLoading,
    setAuthError,
    setCurrentUser,
    setUserLikedSongs,
    toggleLikeSong,
    UserActionTypes,
    userLoading
} from "./userActions";
import {Dispatch} from "redux";
import {url} from "../../config/config";
import {ErrorType, SongType} from "../../config/types";


export const signup = (email: string, password: string, name: string) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        try {
            const response = await axios.post(`${url}/api/auth/register`, {email, password, name});
            console.log(response)
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
            const response = await axios.get(`${url}/api/auth/auth`, {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            })
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
        try {
            const response = await axios.get(`${url}/api/song/user/liked-songs`, {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            })
            dispatch(setUserLikedSongs(response.data))
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
        }
    }
}

export const thunkToggleLikeSong = (song: SongType) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        dispatch(likeLoading(true))
        try {
            const response = await axios.put(`${url}/api/song/user/like/${song._id}`, '', {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            })
            console.log(response)
            dispatch(toggleLikeSong(song))
            dispatch(likeLoading(false))
        } catch (e) {
            const u = e as ErrorType
            dispatch(setAuthError(u.response.data.message))
            dispatch(likeLoading(false))
        }
    }
}
