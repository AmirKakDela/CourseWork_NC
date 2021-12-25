import {combineReducers} from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import sharedReducer from "./sharedReducer";
import artistReducer from "./artistReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    shared: sharedReducer,
    artist: artistReducer
})

export type RootState = ReturnType<typeof rootReducer>;
