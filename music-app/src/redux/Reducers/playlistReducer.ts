import {PlaylistType} from "../../config/types";
import {PlaylistActions, PlaylistActionsType} from "../Actions/playlistActions";

type State = {
    isLoading: boolean,
    playlists: PlaylistType[]
}

const initialState: State = {
    isLoading: false,
    playlists: []
};

const playlistReducer = (state = initialState, action: PlaylistActions): State => {
    switch (action.type) {
        case PlaylistActionsType.SET_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload as PlaylistType[] || initialState.playlists,
            };
        case PlaylistActionsType.SET_PLAYLIST:
            const playlist = action.payload as PlaylistType;
            const filteredPlaylists = state.playlists.filter(value => value._id !== playlist._id);
            return {
                ...state,
                playlists: [...filteredPlaylists, playlist] || initialState.playlists,
            };
        case PlaylistActionsType.UPDATE_PLAYLIST:
            const newPlaylist = action.payload as PlaylistType;
            const newPlaylists = state.playlists.map(playlist => {
                if (playlist._id === newPlaylist._id) return newPlaylist
            })

            console.log(newPlaylist, newPlaylists)
            return {
                ...state,
                playlists: newPlaylists as PlaylistType[] || initialState.playlists,
            };
        // case PlaylistActionsType.SET_POPULAR_PLAYLISTS:
        //     return {
        //         ...state,
        //         popularPlaylists: action.payload as Playlist[] || initialState.popularPlaylists,
        //     };
        case PlaylistActionsType.DELETE_PLAYLIST:
            const id = action.payload as string;
            return {
                ...state,
                playlists: state.playlists.filter(value => value._id !== id),
            };
         // case PlaylistActionsType.CREATE_PLAYLIST:
         //     return {
         //         ...state,
         //         playlists: state.playlists.concat(action.payload as Playlist)
         //     };
         // case PlaylistActionsType.UPDATE_PLAYLIST:
         //     return {
         //         ...state,
         //         playlists: state.playlists.filter(playlist => playlist._id !== action.payload as string).concat(action.payload as Playlist)
         //     };
        default:
            return state;
    }
};

export default playlistReducer;
