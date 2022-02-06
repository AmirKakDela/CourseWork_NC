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
import SearchPage from "./components/Layout/SearchPage/SearchPage";
import ArtistPage from "./components/Layout/ArtistPage/ArtistPage";
import WelcomePage from "./components/Layout/WelcomePage/WelcomePage";
import GuestRoute from "./components/HOC/GuestRoute";
import AppLoading from "./components/AppLoading/AppLoading";
import AdminLayout from "./components/AdminPage/AdminLayout/AdminLayout";
import AdminRoute from "./components/HOC/AdminRoute";
import MyLibraryPage from "./components/Layout/MyLibraryPage/MyLibraryPage";
import LibrarySong from "./components/Layout/MyLibraryPage/LibrarySong";
import GenrePage from "./components/Layout/GenrePage/GenrePage";
import {AlbumPage} from "./components/Layout/AlbumPage/AlbumPage";
import ErrorAlert from "./components/Alert/ErrorAlert/ErrorAlert";

function App() {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const isAdmin = useSelector((state: RootState) => state.user.currentUser.isAdmin);
    const userLoading = useSelector((state: RootState) => state.user.isLoading);
    const error = useSelector((state: RootState) => state.error.errorText);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

    return <>
        {userLoading ? <AppLoading/> :
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path='/auth'>
                            <Route index element={
                                <GuestRoute isAuth={isAuth}>
                                    <Login/>
                                </GuestRoute>
                            }/>
                            <Route path='signup' element={<Signup/>}/>
                        </Route>

                        <Route path='welcome' element={<WelcomePage/>}/>

                        <Route path='/' element={
                            <RequireAuth isAuth={isAuth}>
                                <Layout/>
                            </RequireAuth>}>
                            <Route index element={<MainPage/>}/>
                            <Route path='loved' element={<h1>Loved Songs</h1>}/>
                            <Route path='my-library' element={<MyLibraryPage/>}>
                                <Route index element={<Navigate to='songs'/>}/>
                                <Route path='songs' element={<LibrarySong/>}/>
                                <Route path='albums' element={<h1>playlists</h1>}/>
                                <Route path='playlists' element={<h1>albums</h1>}/>
                            </Route>
                            <Route path='create-playlist' element={<h1>Create playlist</h1>}/>
                            <Route path='my-playlists' element={<h1>My playlists</h1>}/>
                            <Route path='search' element={<SearchPage/>}/>
                            <Route path='artist/:id' element={<ArtistPage/>}/>
                            <Route path='album/:id' element={<AlbumPage/>}/>
                            <Route path='genre/:id' element={<GenrePage/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Route>

                        <Route path='/admin' element={
                            <AdminRoute isAdmin={isAdmin} isAuth={isAuth}>
                                <AdminLayout/>
                            </AdminRoute>}>
                            <Route path="songs" element={<h1>All songs</h1>}/>
                            <Route path="artists" element={<h1>All Artists</h1>}/>
                            <Route path="playlists" element={<h1>All Playlists</h1>}/>
                            <Route path="albums" element={<h1>All Albums</h1>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                {error !== null ? <ErrorAlert error={error}/> : null}
            </>
        }
    </>
        ;
}

export default App;
