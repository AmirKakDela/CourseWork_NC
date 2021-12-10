import axios from "axios";
import {setCurrentUser, UserActionTypes} from "./userActions";
import {Dispatch} from "redux";

export const signup = async (email: string, password: string, name: string) => {
    try {
        const response = await axios.post('/api/auth/register', {email, password, name});
        console.log(response)
    } catch (e) {
        console.log('Ошибка при регистрации', e);
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        try {
            const response = await axios.post('/api/auth/login', {email, password})
            console.log(response);
            dispatch(setCurrentUser({userId: response.data.userId, userName: response.data.userName}))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log('Ошибка при логине', e)
        }
    }
}

export const auth = () => {
    return async (dispatch: Dispatch<UserActionTypes>) => {
        try {
            console.log(localStorage.getItem('token'))
            if (localStorage.getItem('token') === null) return
            // TODO: Сделать что то с url запроса
            const response = await axios.get('http://localhost:5000/api/auth/auth', {
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
