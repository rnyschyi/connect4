import copyArray from "../utils/copyArray";
import * as actionTypes from "./actionTypes";
import {messages} from "../utils/messages";

const initialGameState: GameState = {
    newGame: true,
    gameEnded: false,
    currentPlayer: 1,
    board: Array(6).fill(Array(7).fill(0)),
    message: messages.player1Turn,
};

const reducer = (gameState = initialGameState, action: Action): GameState => {
    switch (action.type) {
        case actionTypes.GAME_RESET:
            return initialGameState;
        case actionTypes.GAME_STARTED:
            return {
                ...gameState,
                newGame: false
            };
        case actionTypes.GAME_ENDED:
            switch (action.payload.result) {
                case 1:
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.player1Won
                    };
                case 2:
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.player2Won
                    };
                case "tie":
                    return {
                        ...gameState,
                        gameEnded: true,
                        message: messages.tie
                    };
                default:
                    return gameState;
            }
        case actionTypes.MAKE_MOVE:
            const boardClone: GameState["board"] = copyArray(gameState.board);
            boardClone[action.payload.rowIndex][action.payload.columnIndex] =
                gameState.currentPlayer;
            return {
                ...gameState,
                board: boardClone
            };
        case actionTypes.TOGGLE_PLAYER:
            switch (gameState.currentPlayer) {
                case 1:
                    return {
                        ...gameState,
                        currentPlayer: 2,
                        message: messages.player2Turn,
                    };
                case 2:
                    return {
                        ...gameState,
                        currentPlayer: 1,
                        message: messages.player1Turn,
                    };
                default:
                    return gameState;
            }
        default:
            return gameState;
    }
};

export default reducer;
