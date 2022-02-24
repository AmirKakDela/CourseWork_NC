import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {Song} from "../../Song/Song";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    thunkUserLikedPlaylists,
    thunkUserPlaylists
} from "../../../redux/Actions/thunkUserActions";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";

const LibraryPlaylists: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    //const isLoading = useSelector((state: RootState) => state.user.libraryLoading);
    //const [isLoading, setIsLoading] = useState<boolean>(true)

    //console.log(isLoading)
    useEffect(() => {
        /*if (isLoading) {
         if (user.likedPlaylists.length === 0) {
         dispatch(thunkUserLikedPlaylists(user.userId));
         }
         if (user.playlists.length === 0) {
         dispatch(thunkUserPlaylists(user.userId));
         }
         //setIsLoading(false)
         }*/
        if (user.likedPlaylists.length === 0) {
            dispatch(thunkUserLikedPlaylists(user.userId));
        }
        if (user.playlists.length === 0) {
            dispatch(thunkUserPlaylists(user.userId));
        }
        console.log(user.playlists);
        console.log(user.likedPlaylists);
    }, [user.likedPlaylists, user.playlists, dispatch]);

    return (
        <>
            {/*{isLoading ? <h1 style={{backgroundColor: 'red', padding: 20}}>IS LOADING</h1> :*/}
            <div className="library__info">
                <h1 className="library__title">Плейлисты</h1>
                <h2 className="library__subtitle">
                    <span>{user.userName}  &bull; </span> {user.playlists.length + user.likedPlaylists.length} плейлистов
                </h2>
                <div className="library__songs-wrap">
                    {user.playlists.length > 0
                        ? <ScrollComponent titleName="Мои плейлисты" data={
                            user.playlists.map(playlist => {
                                return <PlaylistCard key={playlist._id} playlist={playlist}/>;
                            })
                        }/>
                        : <h1 className="library__notsongs">
                            Ты пока не создал ни одного плейлиста.
                        </h1>
                    }
                </div>
                <div className="library__songs-wrap">
                    {user.likedPlaylists.length > 0
                        ? user.likedPlaylists.map((playlist, index) => {
                            return <ScrollComponent titleName="Любимые плейлисты" data={
                                user.likedPlaylists.map(playlist => {
                                    return <PlaylistCard key={playlist._id} playlist={playlist}/>;
                                })
                            }/>;
                        })
                        : <h1 className="library__notsongs">Любимых плейлистов пока нет. Но их можно <Link
                            to="/search">добавить</Link>!
                        </h1>
                    }
                </div>


            </div>
            {/*}*/}
        </>
    );
};

export default LibraryPlaylists;
