import {UserActionTypes, UserActionTypeTypes} from "../Actions/userActions";
import {CurrentUserType} from "../../types";

type InitialStateType = {
    currentUser: CurrentUserType,
    isAuth: boolean,
    error: string | null
}
const initialState: InitialStateType = {
    currentUser: {
        userId: '',
        userName: ''
    },
    isAuth: false,
    error: null
}

const userReducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case UserActionTypeTypes.SET_CURRENT_USER:
            return {
                ...state, currentUser: {...action.payload}, isAuth: true
            }
        case UserActionTypeTypes.LOGOUT_CURRENT_USER:
            return {
                ...state, isAuth: false, currentUser: {userId: '', userName: ''}
            }
        case UserActionTypeTypes.SET_AUTH_ERROR:
            return {
                ...state, error: action.payload
            }
        default:
            return state
    }
}

export default userReducer