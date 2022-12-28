import { useState } from "react";
import {
  getColIndexes,
  getRowIndexes,
  getSquareIndexes,
} from "../../helpers/utils";
import { Cell } from "../Cell/Cell";
import "./Board.scss";

export interface IBoard {
  // board: string[][];
  board: string[];
  checkBoard?(id: number, value: string): void;
}
export const Board = ({ board, checkBoard }: IBoard) => {
  const [selectedSquareInd, setSelectedSquareInd] = useState<number[]>([]);
  const [selectedRowInd, setSelectedRowInd] = useState<number[]>([]);
  const [selectedColInd, setSelectedColInd] = useState<number[]>([]);
  const [boardState, setBoardState] = useState<string[]>([...board]);

  // const rows = (board: string[]): string[][] => {
  //   let splittedBoard: string[][] = [];
  //   for (let row = 0; row < 9; row++) {
  //     splittedBoard[row] = [...board.slice(9 * row, 9 * (row + 1))];
  //   }
  //   return splittedBoard;
  // };

  const onCellClick = (ind: number): void => {
    const squareIndexes: number[] = getSquareIndexes(ind);
    const rowIndexes: number[] = getRowIndexes(ind);
    const colIndexes: number[] = getColIndexes(ind);
    setSelectedSquareInd(squareIndexes);
    setSelectedRowInd(rowIndexes);
    setSelectedColInd(colIndexes);
  };

  const onBlur = (id: number, value: string): void => {
    if (checkBoard?.(id, value)) {
      const newBoard: string[] = [...boardState];
      newBoard[id] = value;
      setBoardState(newBoard);
    }

    setSelectedSquareInd([]);
    setSelectedRowInd([]);
    setSelectedColInd([]);
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {/* {rows(board).map((row, ind) => (
        <Row key={ind} cells={row} />
      ))} */}
        {boardState.map((content: string, ind: number) => (
          <Cell
            key={ind}
            content={content}
            activeAxis={[...selectedRowInd, ...selectedColInd].includes(ind)}
            activeSquare={selectedSquareInd?.includes?.(ind)}
            onCellClick={onCellClick}
            onBlur={onBlur}
            id={ind}
          />
        ))}
      </div>
    </div>
  );
};
