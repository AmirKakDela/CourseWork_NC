import {Dispatch} from "redux";
import {ArtistActionType, setArtist, setArtistLoading} from "./artistActions";
import {url} from "../../config/config";
import axios from "axios";
import {ArtistType, SongType} from "../../config/types";

export const getArtist = (artistId: string) => {
    return async (dispatch: Dispatch<ArtistActionType>) => {
        dispatch(setArtistLoading())
        try {
            const response = await axios.get(`${url}/api/artist/artist/${artistId}`, {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            });
            const artist: ArtistType = response.data.artist;
            const songs: Array<SongType> = response.data.songs;
            artist.songs = [...songs]
            dispatch(setArtist(response.data.artist))
        } catch (e) {
            console.log(e)
        }
    }
}