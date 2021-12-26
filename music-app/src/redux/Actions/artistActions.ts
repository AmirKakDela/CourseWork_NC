import {ArtistType} from "../../config/types";

export enum ArtistActionsTypeTypes {
    SET_ARTIST = 'SET_ARTIST',
    SET_LOADING = 'SET_LOADING'
}

export type ArtistActionType = SetArtistType | SetArtistLoadingType

type SetArtistType = {
    type: ArtistActionsTypeTypes.SET_ARTIST,
    payload: ArtistType
}

export const setArtist = (artist: ArtistType): SetArtistType => {
    return {
        type: ArtistActionsTypeTypes.SET_ARTIST,
        payload: artist
    }
}

type SetArtistLoadingType = {
    type: ArtistActionsTypeTypes.SET_LOADING
}

export const setArtistLoading = (): SetArtistLoadingType => {
    return {
        type: ArtistActionsTypeTypes.SET_LOADING
    }
}