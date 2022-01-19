export type CurrentUserType = {
    userId: string,
    userName: string,
    isAdmin: boolean,
    likedSongs: Array<Track>
}

export type ErrorType = {
    response: {
        data: {
            message: string
        }
    }
}

export type Track = {
    _id: string;
    name: string,
    artist: string,
    cover: string,
    song: string,
    duration: number,
    genre: string
}

export type ArtistType = {
    _id: string;
    name: string,
    songs: Array<Track>,
    albums: Array<string>,
    image: string
}

export type SearchResultType = {
    songs: Array<Track> | [],
    artists: Array<ArtistType> | [],
    // playlists>: todo: потом добавить плейлисты
}

export enum AppTheme {
    DARK = 'dark',
    LIGHT = 'light'
}

export type Album = {
    _id: string,
    name: string,
    artist: string,
    songs: Array<string>,
    cover: string
}
