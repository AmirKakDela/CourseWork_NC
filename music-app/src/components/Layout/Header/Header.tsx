import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {logoutCurrentUser} from "../../../redux/Actions/userActions";
import {Link} from "react-router-dom";
import { Button } from 'antd';
import './header.scss'

const Header = () => {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const userName = useSelector((state: RootState) => state.user.currentUser.userName)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutCurrentUser());
    }

    return (
        <div className='header'>
            Header
            {userName && <h1>{userName}</h1>}
            {isAuth ? <Button onClick={logout}>Выйти</Button>
                : <Button>
                    <Link to={'/auth'}>
                        Войти
                    </Link>
                </Button>
            }
        </div>
    );
};

export default Header;
