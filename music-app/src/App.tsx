import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Signup from "./components/Auth/SignUp/Signup";
import MainPage from "./components/Layout/MainPage/MainPage";
import Login from "./components/Auth/LogIn/Login";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/Reducers/rootReducer";
import {auth} from "./redux/Actions/thunkUserActions";
import RequireAuth from "./components/HOC/RequireAuth";

function App() {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path='/auth'>
                            <Route index element={<Login/>}/>
                            <Route path='signup' element={<Signup/>}/>
                            {/*<Route path='*' element={<Navigate to='/auth'/>}/>*/}
                    </Route>

                    <Route path='/' element={<Layout/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path='loved' element={<h1>Loved Songs</h1>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
