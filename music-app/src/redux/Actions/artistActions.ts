import {ArtistType} from "../../config/types";

export enum ArtistActionsTypeTypes {
    SET_ARTIST = 'SET_ARTIST'
}

export type ArtistActionType = SetArtistType

type SetArtistType = {
    type: ArtistActionsTypeTypes,
    payload: ArtistType
}

export const setArtist = (artist: ArtistType): SetArtistType => {
    return {
        type: ArtistActionsTypeTypes.SET_ARTIST,
        payload: artist
    }
}