import {Track} from "../../config/types";
import {PlayerAction, PlayerActionsType} from "../Actions/playerActions";

type State = {
    pause: boolean,
    playback: Track | null,
    duration: number,
    volume: number,
}

const initialState: State = {
    pause: true,
    volume: 50,
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
        case PlayerActionsType.SET_DURATION:
            return {
                ...state,
                duration: action.payload
            };
        case PlayerActionsType.SET_VOLUME:
            return {
                ...state,
                volume: action.payload
            };
        case PlayerActionsType.SET_PLAYBACK:
            return {
                ...state,
                playback: action.payload,
            };
        default:
            return state;
    }
};

export default playerReducer;
