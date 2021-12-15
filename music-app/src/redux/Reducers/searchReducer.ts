import {SearchResultType} from "../../types/types"
import {SearchActionsTypeTypes, SearchActionType} from "../Actions/searchActions";

type StateType = {
    isLoading: boolean,
    error: string | null,
    searchResult: SearchResultType
}

const initialState: StateType = {
    isLoading: false,
    error: null,
    searchResult: {songs: [], artists: []}
}

const searchReducer = (state = initialState, action: SearchActionType): StateType => {
    switch (action.type) {
        case SearchActionsTypeTypes.SET_SEARCH_RESULT:
            return {
                ...state, isLoading: false, searchResult: action.payload
            }
        case SearchActionsTypeTypes.SEARCH_LOADING:
            return {
                ...state, isLoading: true
            }
        case SearchActionsTypeTypes.SET_SEARCH_ERROR:
            return {
                ...state, isLoading: false, error: action.payload
            }
        default:
            return state;
    }
}

export default searchReducer;