import axios from "axios";
import {setAuthError, setCurrentUser, UserActionTypes} from "./userActions";
import {Dispatch} from "redux";
import {url} from "../../config/config";
import {ErrorType} from "../../config/types";


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
            dispatch(setCurrentUser({userId: response.data.userId, userName: response.data.userName}))
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
        try {
            console.log(localStorage.getItem('token'))
            if (localStorage.getItem('token') === null) return
            const response = await axios.get(`${url}/api/auth/auth`, {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            })
            dispatch(setCurrentUser({userId: response.data.userId, userName: response.data.userName}));
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log('ошибка при авторизации на фронте', e)
            localStorage.removeItem('token');
        }
    }
}
