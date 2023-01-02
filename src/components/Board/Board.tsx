import React, { useState } from "react";
import {
  getColIndexes,
  getRowIndexes,
  getSquareIndexes,
  isOddSquare,
} from "../../helpers/utils";
import { ICell } from "../../types/types";
import { Button } from "../Button/Button";
import { Cell } from "../Cell/Cell";
import "./Board.scss";

export interface IBoard {
  board: ICell[];
  checkBoard(id: number, value: number): void;
  clearBoard(): void;
  acceptAttempt(id: number, value: number): void;
  getCurrentBoardState(): void;
}
export const Board = ({
  board,
  checkBoard,
  clearBoard,
  acceptAttempt,
  getCurrentBoardState,
}: IBoard) => {
  const [selectedSquareInd, setSelectedSquareInd] = useState<number[]>([]);
  const [selectedRowInd, setSelectedRowInd] = useState<number[]>([]);
  const [selectedColInd, setSelectedColInd] = useState<number[]>([]);
  // const [boardState, setBoardState] = useState<string[]>([...board]);

  const onCellClick = (ind: number): void => {
    const squareIndexes: number[] = getSquareIndexes(ind);
    const rowIndexes: number[] = getRowIndexes(ind);
    const colIndexes: number[] = getColIndexes(ind);
    setSelectedSquareInd(squareIndexes);
    setSelectedRowInd(rowIndexes);
    setSelectedColInd(colIndexes);
  };

  const onBlur = (id: number, value: string): void => {
    acceptAttempt?.(id, +value);
    // if (checkBoard?.(id, value)) {
    //   const newBoard: string[] = [...boardState];
    //   newBoard[id] = value;
    //   // setBoardState(newBoard);
    // }

    setSelectedSquareInd([]);
    setSelectedRowInd([]);
    setSelectedColInd([]);
  };

  return (
    <React.Fragment>
      <div className="board-wrapper">
        <div className="board">
          {board.map(({ id, content, disabled }: ICell) => (
            <Cell
              key={id}
              content={content}
              activeAxis={[...selectedRowInd, ...selectedColInd].includes(id)}
              activeSquare={selectedSquareInd?.includes?.(id)}
              onCellClick={onCellClick}
              onBlur={onBlur}
              id={id}
              oddSquare={isOddSquare(id)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <div>
        <Button content={"Clear board"} onClickHandler={clearBoard} />
        <Button content={"Hint"} />
        <Button content={"Surrender"} onClickHandler={getCurrentBoardState} />
        <Button content={"Check"} />
        <Button content={"New game"} />
      </div>

      <div>Reast Nums</div>
    </React.Fragment>
  );
};
