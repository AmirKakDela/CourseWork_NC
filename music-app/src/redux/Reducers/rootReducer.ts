import {combineReducers} from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import sharedReducer from "./sharedReducer";
import albumReducer from "./albumReducer";
import songReducer from "./songReducer";
import {playerReducer} from "./playerReducer";
import genreReducer from "./genreReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    shared: sharedReducer,
    album: albumReducer,
    player: playerReducer,
    song: songReducer,
    genre: genreReducer
})

export type RootState = ReturnType<typeof rootReducer>;
