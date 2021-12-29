import {Album} from "../../config/types";
import {AlbumAction, AlbumActionsType} from "../Actions/albumAction";

type State = {
    albums: Album[],
    popularAlbums: Album[]
}

const initialState: State = {
    albums: [],
    popularAlbums: []
};

const albumReducer = (state = initialState, action: AlbumAction): State => {
    switch (action.type) {
        case AlbumActionsType.SET_ALBUMS:
            return {
                ...state,
                albums: action.payload as Album[] || initialState.albums,
            };
        case AlbumActionsType.SET_ALBUM:
            const album = action.payload as Album;
            const filteredAlbums = state.albums.filter(value => value._id !== album._id);
            return {
                ...state,
                albums: [...filteredAlbums, album] || initialState.albums,
            };
        case AlbumActionsType.SET_POPULAR_ALBUMS:
            return {
                ...state,
                popularAlbums: action.payload as Album[] || initialState.popularAlbums,
            };
        case AlbumActionsType.DELETE_ALBUM:
            const id = action.payload as string;
            return {
                ...state,
                albums: state.albums.filter(value => value._id !== id),
            };
         // case AlbumActionsType.CREATE_ALBUM:
         //     return {
         //         ...state,
         //         albums: state.albums.concat(action.payload as Album)
         //     };
         // case AlbumActionsType.UPDATE_ALBUM:
         //     return {
         //         ...state,
         //         albums: state.albums.filter(album => album._id !== action.payload as string).concat(action.payload as Album)
         //     };
        default:
            return state;
    }
};

export default albumReducer;
