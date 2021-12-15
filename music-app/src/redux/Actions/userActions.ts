import {CurrentUserType} from "../../types/types";

export enum UserActionTypeTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER',
    SET_AUTH_ERROR = 'SET_AUTH_ERROR'
}

export type UserActionTypes = SetCurrentUserType | LogoutCurrentUserType | SetAuthErrorType


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