import {GenreType} from "../../config/types";
import {GenreActionsTypeTypes, GenreActionType} from "../Actions/genreActions";


type StateType = {
    genres: GenreType[]
}

const initialState: StateType = {
    genres: []
}


const genreReducer = (state = initialState, action: GenreActionType) => {
    switch (action.type) {
        case GenreActionsTypeTypes.SET_GENRES:
            return {...state, genres: action.payload}
        default:
            return state
    }
}

export default genreReducer;