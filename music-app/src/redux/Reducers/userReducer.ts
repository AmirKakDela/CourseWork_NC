import {UserActionTypes, UserActionTypeTypes} from "../Actions/userActions";
import {CurrentUserType} from "../../config/types";

type InitialStateType = {
    currentUser: CurrentUserType,
    isAuth: boolean,
    error: string | null,
    isLoading: boolean
}
const initialState: InitialStateType = {
    currentUser: {
        userId: '',
        userName: '',
        isAdmin: false
    },
    isAuth: false,
    error: null,
    isLoading: true
}

const userReducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case UserActionTypeTypes.SET_CURRENT_USER:
            return {
                ...state, currentUser: {...action.payload}, isAuth: true, isLoading: false
            }
        case UserActionTypeTypes.LOGOUT_CURRENT_USER:
            return {
                ...state, isAuth: false, currentUser: {userId: '', userName: '', isAdmin: false}
            }
        case UserActionTypeTypes.SET_AUTH_ERROR:
            return {
                ...state, error: action.payload, isLoading: false
            }
        case UserActionTypeTypes.USER_LOADING:
            return {
                ...state, isLoading: action.payload
            }
        default:
            return state
    }
}

export default userReducer