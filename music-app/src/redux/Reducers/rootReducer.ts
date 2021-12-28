import {combineReducers} from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import sharedReducer from "./sharedReducer";
import albumReducer from "./albumReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    shared: sharedReducer,
    album: albumReducer
})

export type RootState = ReturnType<typeof rootReducer>;
