import * as actionTypes from "./actionTypes";

export const resetGame = () => {
    const action: Action = {
        type: actionTypes.GAME_RESET
    };
    return action;
};

export const gameStarted = () => {
    const action: Action = {
        type: actionTypes.GAME_STARTED
    };
    return action;
};

export const endGame = (payload: Result) => {
    const action: Action = {
        type: actionTypes.GAME_ENDED,
        payload
    };
    return action;
};

export const makeMove = (payload: Indexes) => {
    const action: Action = {
        type: actionTypes.MAKE_MOVE,
        payload
    };
    return action;
};

export const togglePlayer = () => {
    const action: Action = {
        type: actionTypes.TOGGLE_PLAYER
    };
    return action;
};
