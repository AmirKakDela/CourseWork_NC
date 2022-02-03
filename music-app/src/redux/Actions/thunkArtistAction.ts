import {Dispatch} from "redux";
import {ArtistActionType, setArtist, setLoading, setArtists} from "./artistActions";
import {url} from "../../config/config";
import axios from "axios";
import {ArtistType, Track} from "../../config/types";
import {AlbumActionsType} from "./albumAction";
import {SongActionTypes} from "./songAction";

export const getArtist = (artistId: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setLoading());
        try {
            const response = await axios.get(`${url}/api/artist/artist/${artistId}`, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            const artist: ArtistType = response.data.artist;
            const songs: Array<Track> = response.data.songs;
            const albums: Array<Track> = response.data.albums;
           // artist.songs = [...songs];
            dispatch(setArtist(artist));
            dispatch({ type: AlbumActionsType.SET_ALBUMS, payload: albums });
            dispatch({ type: SongActionTypes.FETCH_SONGS, payload: songs });
        } catch (e) {
            console.log(e);
        }
    };
};

export const getAllArtists = () => {
    return async (dispatch: Dispatch<ArtistActionType>) => {
        dispatch(setLoading());
        try {
            const response = await axios.get(`${url}/api/artist/all`, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch(setArtists(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};
