import {combineReducers} from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import sharedReducer from "./sharedReducer";
import artistReducer from "./artistReducer";
import albumReducer from "./albumReducer";
import songReducer from "./songReducer";
import {playerReducer} from "./playerReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    shared: sharedReducer,
    artist: artistReducer,
    album: albumReducer,
    player: playerReducer,
    song: songReducer
})

export type RootState = ReturnType<typeof rootReducer>;
