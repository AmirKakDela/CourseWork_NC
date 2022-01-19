import {CurrentUserType, Track} from "../../config/types";

export enum UserActionTypeTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER',
    SET_AUTH_ERROR = 'SET_AUTH_ERROR',
    SET_USER_LIKED_SONGS = 'SET_USER_LIKED_SONGS',
    TOGGLE_LIKE_SONG = 'TOGGLE_LIKE_SONG',
    USER_LOADING = 'USER_LOADING',
    LIKE_LOADING = 'LIKE_LOADING'
}

export type UserActionTypes = SetCurrentUserType
    | LogoutCurrentUserType
    | SetAuthErrorType
    | SetUserLikedSongsType
    | UserLoadingType
    | ToggleLikeSongType
    | LikeLoadingType


type LogoutCurrentUserType = {
    type: UserActionTypeTypes.LOGOUT_CURRENT_USER
}

export const logoutCurrentUser = (): LogoutCurrentUserType => {
    localStorage.removeItem('token');
    return {
        type: UserActionTypeTypes.LOGOUT_CURRENT_USER
    }
}

export type SetCurrentUserType = {
    type: UserActionTypeTypes.SET_CURRENT_USER,
    payload: CurrentUserType
}
export const setCurrentUser = (currentUser: CurrentUserType): SetCurrentUserType => {
    return {
        type: UserActionTypeTypes.SET_CURRENT_USER,
        payload: currentUser
    }
}

export type SetAuthErrorType = {
    type: UserActionTypeTypes.SET_AUTH_ERROR,
    payload: string | null
}

export const setAuthError = (error: string | null): SetAuthErrorType => {
    return {
        type: UserActionTypeTypes.SET_AUTH_ERROR,
        payload: error
    }
}

export type UserLoadingType = {
    type: UserActionTypeTypes.USER_LOADING,
    payload: boolean
}

export const userLoading = (status: boolean): UserLoadingType => {
    return {
        type: UserActionTypeTypes.USER_LOADING,
        payload: status
    }
}

export type SetUserLikedSongsType = {
    type: UserActionTypeTypes.SET_USER_LIKED_SONGS,
    payload: Array<Track>
}

export const setUserLikedSongs = (likedSongs: Array<Track>): SetUserLikedSongsType => {
    return {
        type: UserActionTypeTypes.SET_USER_LIKED_SONGS,
        payload: likedSongs
    }
}

export type ToggleLikeSongType = {
    type: UserActionTypeTypes.TOGGLE_LIKE_SONG,
    payload: Track
}

export const toggleLikeSong = (song: Track): ToggleLikeSongType => {
    return {
        type: UserActionTypeTypes.TOGGLE_LIKE_SONG,
        payload: song
    }
}

export type LikeLoadingType = {
    type: UserActionTypeTypes.LIKE_LOADING,
    payload: boolean
}

export const likeLoading = (status: boolean): LikeLoadingType => {
    return {
        type: UserActionTypeTypes.LIKE_LOADING,
        payload: status
    }
}
