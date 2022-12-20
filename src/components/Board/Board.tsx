import { memo, useCallback, useMemo, useState } from "react";
import {
  getColIndexes,
  getRowIndexes,
  getSquareIndexes,
} from "../../helpers/utils";
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
    const squareIndexes: number[] = getSquareIndexes(ind);
    const rowIndexes: number[] = getRowIndexes(ind);
    const colIndexes: number[] = getColIndexes(ind);
    setSelectedCellInd(3);
    setSelectedSquareInd(squareIndexes);
    setSelectedRowInd(rowIndexes);
    setSelectedColInd(colIndexes);
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
