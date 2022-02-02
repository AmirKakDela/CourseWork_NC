import {GenreType} from "../../config/types";

export enum GenreActionsTypeTypes {
    SET_GENRES = 'SET_GENRES'
}

export type GenreActionType = SetGenresType

type SetGenresType = {
    type: GenreActionsTypeTypes.SET_GENRES,
    payload: GenreType[]
}

export const setGenres = (genres: GenreType[]): SetGenresType => {
    return {
        type: GenreActionsTypeTypes.SET_GENRES,
        payload: genres
    }
}