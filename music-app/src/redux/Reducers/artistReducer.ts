import {ArtistType} from "../../config/types";
import {ArtistActionsTypeTypes, ArtistActionType} from "../Actions/artistActions";

type StateType = {
    artist: ArtistType,
    isLoading: boolean
}

const initialState: StateType = {
    artist: {
        _id: '',
        name: '',
        songs: [],
        albums: [],
        image: ''
    },
    isLoading: false
}

const artistReducer = (state: StateType = initialState, action: ArtistActionType): StateType => {
    switch (action.type) {
        case ArtistActionsTypeTypes.SET_ARTIST:
            return {...state, artist: action.payload, isLoading: false}
        case ArtistActionsTypeTypes.SET_LOADING:
            return {...state, isLoading: true}
        default:
            return state
    }
}

export default artistReducer;