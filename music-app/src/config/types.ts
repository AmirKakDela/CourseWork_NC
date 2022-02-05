import * as React from "react";

export type CurrentUserType = {
    userId: string,
    userName: string,
    isAdmin: boolean,
    likedSongs: Array<SongType>
}

export type ErrorType = {
    response: {
        data: {
            message: string
        }
    }
}

export type SongType = {
    _id: string;
    name: string,
    artist: string,
    cover: string,
    song: string,
    duration: number,
    genre: string
}

export type AlbumType = {
    _id: string,
    name: string,
    artist: string,
    songs: Array<SongType>,
    cover: string
}

export type GenreType = {
    _id: string,
    color: string,
    name: string,
}

export type ArtistType = {
    _id: string;
    name: string,
    image: string
}

export type SearchResultType = {
    songs: Array<SongType> | [],
    artists: Array<ArtistType> | [],
    // playlists>: todo: потом добавить плейлисты
}

export enum AppTheme {
    DARK = 'dark',
    LIGHT = 'light'
}

export type SidebarItemType = {
    path: string,
    itemId: string,
    icon?: React.ForwardRefExoticComponent<any>,
    text: string
}
