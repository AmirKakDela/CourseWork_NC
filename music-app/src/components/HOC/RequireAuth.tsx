import React from 'react';
import {useLocation, Navigate} from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    children: JSX.Element
}

const RequireAuth: React.FC<PropsType> = ({children, isAuth}) => {
    console.log(isAuth)
    console.log('work')
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to='/auth' state={{from: location}}/>
    }
    return children;
};

export default RequireAuth;