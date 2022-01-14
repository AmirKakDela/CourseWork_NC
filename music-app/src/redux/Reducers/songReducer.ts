import {SongType} from "../../config/types";
import {SongAction, SongActionTypes} from "../Actions/songAction";

type State = {
    tracks: SongType[],
    error: string
}

const initialState: State = {
    tracks: [],
    error: ''
}

const songReducer = (state = initialState, action: SongAction): State => {
    switch (action.type) {
        case SongActionTypes.FETCH_SONGS_ERROR:
            return {...state, error: action.payload}
        case SongActionTypes.FETCH_SONGS:
            return {error: '', tracks: action.payload}
        default:
            return state;
    }
}

export default songReducer;
