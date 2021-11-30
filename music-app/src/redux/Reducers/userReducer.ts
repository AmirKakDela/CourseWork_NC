import {UserActionTypes, UserActionTypeTypes} from "../Actions/userActions";
import {CurrentUserType} from "../../types";

type InitialStateType = {
    currentUser: CurrentUserType,
    isAuth: boolean
}
const initialState: InitialStateType = {
    currentUser: {
        userId: '',
        userName: ''
    },
    isAuth: false
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
        default:
            return state
    }
}

export default userReducer