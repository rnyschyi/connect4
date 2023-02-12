import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
    resetGame,
    endGame,
    makeMove,
    togglePlayer,
    gameStarted
} from "./store/actionCreators";
import GameBoard from "./components/GameBoard";
import checkWin from "./utils/checkWin";
import classNames from "classnames";
import Swal from "sweetalert2";

const App = () => {
    const board = useSelector((state: GameState) => state.board);
    const newGame = useSelector((state: GameState) => state.newGame);
    const gameEnded = useSelector((state: GameState) => state.gameEnded);
    const message = useSelector((state: GameState) => state.message);
    const player = useSelector((state: GameState)=> state.currentPlayer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (newGame) {
            dispatch(gameStarted());
            return;
        }
        if (!gameEnded) {
            const result = checkWin(board);
            if (result) {
                dispatch(endGame({ result: result }));
            } else {
                dispatch(togglePlayer());
            }
        }
        else {
            Swal.fire({
                title: "Game Finished",
                html: `${message}`,
                icon: "success",
                 customClass: "swal-success"
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board, gameEnded, dispatch]);

    const restartGame = () => {
        dispatch(resetGame());
    };

    const handleMove = (columnIndex: number) => {
        if (!gameEnded) {
            for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
                if (board[rowIndex][columnIndex] === 0) {
                    dispatch(
                        makeMove({
                            rowIndex: rowIndex,
                            columnIndex: columnIndex
                        })
                    );
                    return;
                }
            }
        }
    };

    const showRules = () => {
        Swal.fire({
            title: "Connect 4 Rules",
            html:
                "<ul class='rules'>" +
                "<li>Players must connect 4 of the same colored discs in a row to win.</li>" +
                "<li>Only one piece is played at a time.</li>" +
                "<li>Players can be on the offensive or defensive.</li>" +
                "<li>The game ends when there is a 4-in-a-row or a stalemate.</li>" +
                "</ul>",
            icon: "warning",
            customClass: "swal-rules"
        }
    );};



    return (
        <div className="app">
            <header>
                <h1>Connect4 Game</h1>
                <button onClick={showRules} className="secondary-button ">Show rules</button>
            </header>
            <main>
                <div className="game-info-container ">
                    <button onClick={restartGame} className="primary-button">Start new game!</button>
                    <p data-testid="game-info" className={
                        classNames({
                            "player-is-yellow": player === 1,
                            "player-is-red": player === 2,
                        }
                    )}>{message}</p>
                </div>
                <div className="game-board" role="grid">
                    <GameBoard board={board} handleMove={handleMove} />
                </div>
            </main>
            <footer>
                <p>contact me: <a href="mailto:roman.nyshchyi@intellias.com">roman.nyshchyi@intellias.com</a></p>
            </footer>
        </div>
    );
};

export default App;
