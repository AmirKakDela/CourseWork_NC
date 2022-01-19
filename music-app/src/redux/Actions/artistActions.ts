import {ArtistType} from "../../config/types";

export enum ArtistActionsTypeTypes {
    SET_ARTIST = "SET_ARTIST",
    SET_LOADING = "SET_LOADING",
    SET_ARTISTS = "SET_ARTISTS"
}

export type ArtistActionType = SetArtistType | SetLoadingType | SetAllArtistsType

type SetArtistType = {
    type: ArtistActionsTypeTypes.SET_ARTIST,
    payload: ArtistType
}

type SetAllArtistsType = {
    type: ArtistActionsTypeTypes.SET_ARTISTS,
    payload: ArtistType[]
}

export const setArtist = (artist: ArtistType): SetArtistType => {
    return {
        type: ArtistActionsTypeTypes.SET_ARTIST,
        payload: artist
    };
};

export const setArtists = (artists: ArtistType[]): SetAllArtistsType => {
    return {
        type: ArtistActionsTypeTypes.SET_ARTISTS,
        payload: artists
    };
};

type SetLoadingType = {
    type: ArtistActionsTypeTypes.SET_LOADING
}

export const setLoading = (): SetLoadingType => {
    return {
        type: ArtistActionsTypeTypes.SET_LOADING
    };
};
