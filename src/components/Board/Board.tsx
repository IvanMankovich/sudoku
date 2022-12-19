import { memo, useCallback, useMemo, useState } from "react";
import { getSquareIndexes } from "../../helpers/utils";
import { Cell } from "../Cell/Cell";
import { Row } from "../Row/Row";
import "./Board.scss";

export interface IBoard {
  // board: string[][];
  board: string[];
}
export const Board = ({ board }: IBoard) => {
  const [selectedCellInd, setSelectedCellInd] = useState<number | null>(null);
  const [selectedSquareInd, setSelectedSquareInd] = useState<number[]>([]);
  const [selectedRowInd, setSelectedRowInd] = useState<number[]>([]);
  const [selectedColInd, setSelectedColInd] = useState<number[]>([]);

  const highlightSquare = () => {};
  const highlightColumn = () => {};
  const highlightRow = () => {};
  const setCellActive = () => {};

  const rows = (board: string[]): string[][] => {
    let splittedBoard: string[][] = [];
    for (let row = 0; row < 9; row++) {
      splittedBoard[row] = [...board.slice(9 * row, 9 * (row + 1))];
    }
    return splittedBoard;
  };

  const onCellClick = (ind: number): void => {
    console.log(ind);
    let a = getSquareIndexes(ind);
    console.log("getSquareIndexes", a);
    setSelectedCellInd(3);
    setSelectedSquareInd([3, 4, 5, 12, 13, 14, 21, 22, 23]);
    setSelectedRowInd([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSelectedColInd([3, 12, 21, 30, 39, 48, 57, 66, 75]);
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {/* {rows(board).map((row, ind) => (
        <Row key={ind} cells={row} />
      ))} */}
        {board.map((content: string, ind: number) => (
          <Cell
            key={ind}
            content={content}
            activeAxis={[...selectedRowInd, ...selectedColInd].includes(ind)}
            activeSquare={selectedSquareInd?.includes?.(ind)}
            onCellClick={onCellClick}
            id={ind}
          />
        ))}
      </div>
    </div>
  );
};
