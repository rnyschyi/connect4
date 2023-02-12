//vertical check for winner
const checkVertically = (board: number[][]) => {
    const transposedBoard = board[0].map((c, i) => board.map((r) => r[i]));
    return checkHorizontally(transposedBoard);
};

//horizontal check for winner
const checkHorizontally = (board: number[][]) => {
    const stringifiedBoard = board.map((row) => row.join("")).join(",");
    const matchedStrings = stringifiedBoard.match(/1{4}|2{4}/);
    if (matchedStrings) {
        return ~~matchedStrings[0][0];
    }
    return false;
};

//diagonal check for winner RTL
const checkDiagonalRightToLeft = (board: number[][]) => {
    for (let r = 3; r <= 5; r++) {
        for (let c = 3; c <= 6; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c - 1] &&
                    board[r][c] === board[r - 2][c - 2] &&
                    board[r][c] === board[r - 3][c - 3]
                ) {
                    return board[r][c];
                }
            }
        }
    }
    return false;
};

//diagonal check for winner LTR
const checkDiagonalLeftToRight = (board: number[][]) => {
    for (let r = 3; r <= 5; r++) {
        for (let c = 0; c <= 3; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c + 1] &&
                    board[r][c] === board[r - 2][c + 2] &&
                    board[r][c] === board[r - 3][c + 3]
                ) {
                    return board[r][c];
                }
            }
        }
    }
    return false;
};

//Tie ?
const checkTie = (board: number[][]) => {
    if (board.length !== 0 && board.flat().every((cell) => cell !== 0)) {
        return "tie";
    }
    return false;
};

const checkWin = (board: number[][]) => {
    return (
        checkHorizontally(board) ||
        checkVertically(board) ||
        checkDiagonalLeftToRight(board) ||
        checkDiagonalRightToLeft(board) ||
        checkTie(board)
    );
};

export default checkWin;
