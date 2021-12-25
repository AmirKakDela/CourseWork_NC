import {ArtistType} from "../../config/types";
import {ArtistActionsTypeTypes, ArtistActionType} from "../Actions/artistActions";

type StateType = {
    artist: ArtistType
}

const initialState: StateType = {
    artist: {
        _id: '',
        name: '',
        songs: [],
        albums: [],
        image: ''
    }
}

const artistReducer = (state: StateType = initialState, action: ArtistActionType) => {
    switch (action.type) {
        case ArtistActionsTypeTypes.SET_ARTIST:
            return {...state, artist: action.payload}
        default:
            return state
    }
}

export default artistReducer;