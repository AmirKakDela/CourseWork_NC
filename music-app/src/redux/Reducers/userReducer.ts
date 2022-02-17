import {UserActionTypes, UserActionTypeTypes} from "../Actions/userActions";
import {CurrentUserType} from "../../config/types";

type InitialStateType = {
    currentUser: CurrentUserType,
    isAuth: boolean,
    error: string | null,
    isLoading: boolean,
    libraryLoading: boolean
}

const initialState: InitialStateType = {
    currentUser: {
        userId: '',
        userName: '',
        isAdmin: false,
        likedSongs: [],

        likeLoading: {
            songId: '',
            status: false
        },
        playlists: [],
        likedPlaylists: [],
        likePlaylistLoading : {
            playlistId: '',
            status: false
        }
    },
    isAuth: false,
    error: null,
    isLoading: true,
    libraryLoading: true
}

const userReducer = (state = initialState, action: UserActionTypes): InitialStateType => {
    switch (action.type) {
        case UserActionTypeTypes.SET_CURRENT_USER:
            return {
                ...state, currentUser: {...action.payload}, isAuth: true, isLoading: false
            }
        case UserActionTypeTypes.LOGOUT_CURRENT_USER:
            return {
                ...state, isAuth: false, currentUser: {
                    userId: '', userName: '', isAdmin: false, likedSongs: [], likeLoading: {
                        songId: '',
                        status: false
                    },
                    playlists: [], likedPlaylists: [], likePlaylistLoading : {
                        playlistId: '',
                        status: false
                    }
                }
            }
        case UserActionTypeTypes.SET_AUTH_ERROR:
            return {
                ...state, error: action.payload, isLoading: false
            }
        case UserActionTypeTypes.USER_LOADING:
            return {
                ...state, isLoading: action.payload
            }
        case UserActionTypeTypes.SET_USER_LIKED_SONGS:
            return {
                ...state, libraryLoading: false, currentUser: {...state.currentUser, likedSongs: action.payload}
            }
        case UserActionTypeTypes.TOGGLE_LIKE_SONG:
            return {
                ...state, currentUser: {
                    ...state.currentUser,
                    likedSongs: state.currentUser.likedSongs.findIndex(song => song._id === action.payload._id) === -1 ?
                        [...state.currentUser.likedSongs, action.payload] :
                        state.currentUser.likedSongs.filter(song => song._id !== action.payload._id)
                }
            }
        case UserActionTypeTypes.LIKE_LOADING:
            return {
                ...state, currentUser: {...state.currentUser, likeLoading: action.payload}
            }
        case UserActionTypeTypes.SET_USER_PLAYLISTS:
            return {
                ...state, currentUser: {...state.currentUser, playlists: action.payload}
            }
        case UserActionTypeTypes.SET_USER_LIKED_PLAYLISTS:
            return {
                ...state, libraryLoading: false, currentUser: {...state.currentUser, likedPlaylists: action.payload}
            }
        case UserActionTypeTypes.TOGGLE_LIKE_PLAYLIST:
            return {
                ...state, currentUser: {
                    ...state.currentUser,
                    likedPlaylists: state.currentUser.likedPlaylists.findIndex(playlist => playlist._id === action.payload._id) === -1 ?
                        [...state.currentUser.likedPlaylists, action.payload] :
                        state.currentUser.likedPlaylists.filter(playlist => playlist._id !== action.payload._id)
                }
            }
        case UserActionTypeTypes.LIKE_PLAYLIST_LOADING:
            return {
                ...state, currentUser: {...state.currentUser, likePlaylistLoading: action.payload}
            }
        default:
            return state
    }
}

export default userReducer
