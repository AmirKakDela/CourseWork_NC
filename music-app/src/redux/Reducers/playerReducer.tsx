import {SongType} from "../../config/types";
import {PlayerAction, PlayerActionsType} from "../Actions/playerActions";

type State = {
    pause: boolean,
    playback: SongType | null,
    duration: SongType["duration"],
    volume: number,
    currentTime: number
}

const initialState: State = {
    pause: true,
    volume: 50,
    currentTime: 0,
    playback: null,
    duration: 0
};

const playerReducer = (state = initialState, action: PlayerAction): State => {
    switch (action.type) {
        case PlayerActionsType.PAUSE:
            return {
                ...state,
                pause: true
            };
        case PlayerActionsType.PLAY:
            return {
                ...state,
                pause: false
            };
        case PlayerActionsType.SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload as number
            };
        case PlayerActionsType.SET_DURATION:
            return {
                ...state,
                duration: action.payload as number
            };
        case PlayerActionsType.SET_VOLUME:
            return {
                ...state,
                volume: action.payload as number
            };
        case PlayerActionsType.SET_PLAYBACK:
            return {
                ...state,
                playback: action.payload as SongType,
                duration: 0,
                currentTime: 0
            };
        default:
            return state;
    }
};

export default playerReducer;
