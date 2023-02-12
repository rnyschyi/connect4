interface GameState {
    board: number[][];
    currentPlayer: number;
    gameEnded: boolean;
    newGame: boolean
    message: string;
}

type Result = {
    result: number | string;
};

type Indexes = {
    rowIndex: number;
    columnIndex: number;
};

type Action =
    | { type: "GAME_RESET" }
    | { type: "GAME_STARTED" }
    | { type: "GAME_ENDED"; payload: Result }
    | { type: "MAKE_MOVE"; payload: Indexes }
    | { type: "TOGGLE_PLAYER" };

type DispatchType = (args: Action) => Action;
