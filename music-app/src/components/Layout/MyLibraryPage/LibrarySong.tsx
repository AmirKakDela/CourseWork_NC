import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import Song from "../../Song/Song";
import {thunkUserLikedSongs} from "../../../redux/Actions/thunkUserActions";
import {Link} from "react-router-dom";
import {fetchSongs} from "../../../redux/Actions/thunkSongActions";

const LibrarySong: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.likedSongs.length <= 0) {
            dispatch(thunkUserLikedSongs())
        }
        dispatch(fetchSongs());
    }, [])

    const tracks = useSelector((state: RootState) => state.song.tracks);
    const error = useSelector((state: RootState) => state.song.error);
    if (error){
        return (
            <div>
                <h1>{error}</h1>
            </div>
        )
    }

    return (
            <div className="library__info">
                <h1 className="library__title">Любимые треки</h1>
                <h2 className="library__subtitle"><span>{user.userName}  &bull; </span> {user.likedSongs.length} треков
                </h2>

                {user.likedSongs.length > 0 ? user.likedSongs.map((song, index) => {
                    return <Song key={song._id} song={song} order={index + 1}/>
                }) : <h1 className="library__notsongs">Треков пока нет. Но их можно <Link to='/search'>добавить</Link>!</h1>
                }
            </div>
    );
};

export default LibrarySong;
