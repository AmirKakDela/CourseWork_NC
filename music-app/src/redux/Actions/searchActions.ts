import {SearchResultType} from "../../config/types";

export enum SearchActionsTypeTypes {
    SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
    SET_SEARCH_ERROR = 'SET_SEARCH_ERROR',
    SEARCH_LOADING = 'SEARCH_LOADING'
}

export type SearchActionType = SetSearchResultType | SearchLoadingType | SetSearchErrorType

type SearchLoadingType = {
    type: SearchActionsTypeTypes.SEARCH_LOADING
}

export const searchLoading = (): SearchLoadingType => {
    return {
        type: SearchActionsTypeTypes.SEARCH_LOADING
    }
}

type SetSearchResultType = {
    type: SearchActionsTypeTypes.SET_SEARCH_RESULT,
    payload: SearchResultType
}

export const setSearchResult = (searchResult: SearchResultType): SetSearchResultType => {
    return {
        type: SearchActionsTypeTypes.SET_SEARCH_RESULT,
        payload: searchResult
    }
}

type SetSearchErrorType = {
    type: SearchActionsTypeTypes.SET_SEARCH_ERROR,
    payload: string
}

export const setSearchError = (searchError: string): SetSearchErrorType => {
    return {
        type: SearchActionsTypeTypes.SET_SEARCH_ERROR,
        payload: searchError
    }
}