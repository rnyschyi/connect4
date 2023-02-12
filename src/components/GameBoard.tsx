import classNames from "classnames";

type HandleMove = (columnIndex: number) => void;

interface BoardProperties {
    board: number[][];
    handleMove: HandleMove;
}

interface RowProperties {
    row: number[];
    handleMove: HandleMove;
}

interface CellProperties {
    player: number;
    columnIndex: number;
    handleMove: HandleMove;
}

function Row({ row, handleMove }: RowProperties) {
  return (
    <div className="row" role="row">
      {row.map((cell: number, index: number) => (
        <Cell
          player={cell}
          columnIndex={index}
          handleMove={handleMove}
          key={index}
        />
      ))}
    </div>
  );
}

function Cell({ player, columnIndex, handleMove }: CellProperties) {
  return (
    <div
      onClick={() => handleMove(columnIndex)}
      className={classNames({
        cell: true,
        "cell-yellow": player === 1,
        "cell-red": player === 2,
      })}
      role="gridcell"
    />
  );
}

function Board({ board, handleMove }: BoardProperties) {
  return (
    <>
      {board.map((row: number[], rowIndex: number) => (
        <Row
          row={row}
          handleMove={handleMove}
          key={rowIndex}
        />
      ))}
    </>
  );
}

export default Board;
