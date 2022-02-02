import {Dispatch} from "redux";
import axios from "axios";
import {url} from "../../config/config";
import {GenreActionType, setGenres} from "./genreActions";

export const getAllGenres = () => {
    return async (dispatch: Dispatch<GenreActionType>) => {
        try {
            const response = await axios.get(`${url}/api/genre/all-genres`, {
                headers: {
                    Authorization: "" + localStorage.getItem("token")
                }
            });
            dispatch(setGenres(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}