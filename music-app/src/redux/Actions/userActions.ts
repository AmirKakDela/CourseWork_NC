import {CurrentUserType} from "../../types";

export enum UserActionTypeTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
}

export type UserActionTypes = SetCurrentUserType | LogoutCurrentUserType


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