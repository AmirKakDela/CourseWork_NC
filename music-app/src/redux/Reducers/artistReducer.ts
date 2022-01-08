import {Album, ArtistType} from "../../config/types";
import {ArtistActionsTypeTypes, ArtistActionType} from "../Actions/artistActions";
import {AlbumActionsType} from "../Actions/albumAction";

type StateType = {
    isLoading: boolean,
    artists: ArtistType[]
}

const initialState: StateType = {
    isLoading: false,
    artists: []
}

const artistReducer = (state: StateType = initialState, action: ArtistActionType): StateType => {
    switch (action.type) {
        case ArtistActionsTypeTypes.SET_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ArtistActionsTypeTypes.SET_ARTIST:
            return {
                ...state, // upsert
                isLoading: false
            };
        case ArtistActionsTypeTypes.SET_ARTISTS:
            return {
                ...state,
                artists: action.payload || initialState.artists,
                isLoading: false
            };
        default:
            return state
    }
}

export default artistReducer;
