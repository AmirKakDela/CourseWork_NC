import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {Song} from "../../Song/Song";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {thunkUserLikedSongs} from "../../../redux/Actions/thunkUserActions";
import {useActions} from "../../../hooks/useActions";
import {SongType} from "../../../config/types";

const LibrarySong: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const isLoading = useSelector((state: RootState) => state.user.libraryLoading);
    const { setPlayingSong, setPlayingSongList } = useActions();
    useEffect(() => {
        if (user.likedSongs.length === 0 && isLoading) {
            dispatch(thunkUserLikedSongs());
        }
    }, [user.likedSongs.length, isLoading, dispatch]);

    function onPlay(song: SongType) {
        setPlayingSongList(user.likedSongs);
        setPlayingSong(song);
    }

    return (
        <>
            {isLoading ? <h1 style={{ backgroundColor: "red", padding: 20 }}>IS LOADING</h1> :
                <div className="library__info">
                    <h1 className="library__title">Любимые треки</h1>
                    <h2 className="library__subtitle">
                        <span>{user.userName}  &bull; </span> {user.likedSongs.length} треков
                    </h2>
                    <div className="library__songs-wrap">
                        {user.likedSongs.length > 0
                            ? user.likedSongs.map((song, index) => {
                                return <Song key={song._id} song={song} order={index + 1} onPlay={onPlay.bind(this, song)}/>;
                            })
                            : <h1 className="library__notsongs">
                                Треков пока нет. Но их можно
                                <Link to="/search">добавить</Link>!
                            </h1>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default LibrarySong;
