import {SearchActionType, setSearchError, setSearchResult} from "./searchActions";
import {Dispatch} from "redux";
import axios from "axios";
import {url} from "../../config/config";
import {ErrorType} from "../../types/types";

export const getSearchResult = (queryValue: string) => {
    return async (dispatch: Dispatch<SearchActionType>) => {
        try {
            const response = await axios.get(`${url}/api/search/?query=${queryValue.trim()}`, {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            });
            if (!Object.keys(response.data).length) {
                return dispatch(setSearchResult({songs: [], artists: []}));
            }
            dispatch(setSearchResult(response.data));
        } catch (e) {
            const u = e as ErrorType
            dispatch(setSearchError(u.response.data.message))
        }
    }
}