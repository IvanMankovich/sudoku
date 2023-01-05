import React, { useState } from "react";
import { BoardGenerator } from "../../helpers/boardGenerator";
import {
  getColIndexes,
  getRowIndexes,
  getSquareIndexes,
  isOddSquare,
} from "../../helpers/utils";
import { Button } from "../Button/Button";
import { Cell } from "../Cell/Cell";
import { RemainingNumbersBoard } from "../RemainingNumbersBoard/RemainingNumbersBoard";
import "./Board.scss";

export interface IBoard {
  board: BoardGenerator;
}

export const Board = ({ board }: IBoard) => {
  const [selectedSquareInd, setSelectedSquareInd] = useState<number[]>([]);
  const [selectedRowInd, setSelectedRowInd] = useState<number[]>([]);
  const [selectedColInd, setSelectedColInd] = useState<number[]>([]);
  const [boardState, setBoardState] = useState<string[]>(board.boardAnswer);
  const [remainingNumbers, setRemainingNumbers] = useState(
    board.remainingNumbers
  );

  const onCellClick = (ind: number): void => {
    const squareIndexes: number[] = getSquareIndexes(ind);
    const rowIndexes: number[] = getRowIndexes(ind);
    const colIndexes: number[] = getColIndexes(ind);
    setSelectedSquareInd(squareIndexes);
    setSelectedRowInd(rowIndexes);
    setSelectedColInd(colIndexes);
  };

  const onBlur = (id: number, value: string): void => {
    board.acceptAttempt?.(id, +value);

    setSelectedSquareInd([]);
    setSelectedRowInd([]);
    setSelectedColInd([]);
  };

  const onChange = (id: number, value: string): void => {
    const newBoard: string[] = [...boardState];
    newBoard[id] = value;
    setBoardState(newBoard);
    board.acceptAttempt?.(id, +value);
    if (+value) {
      setRemainingNumbers({
        ...remainingNumbers,
        [value]: remainingNumbers[value] - 1,
      });
    } else {
      setRemainingNumbers({
        ...remainingNumbers,
        [boardState[id]]: remainingNumbers[boardState[id]] + 1,
      });
    }
  };

  const onClearClick = (): void => {
    setBoardState(board.board);
  };

  return (
    <React.Fragment>
      <div className="board-wrapper">
        <div className="board">
          {boardState.map((num: string, id: number) => (
            <Cell
              key={id}
              content={+num}
              activeAxis={[...selectedRowInd, ...selectedColInd].includes(id)}
              activeSquare={selectedSquareInd?.includes?.(id)}
              onCellClick={onCellClick}
              onBlur={onBlur}
              id={id}
              oddSquare={isOddSquare(id)}
              disabled={board.board[id] !== "0"}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
      <div>
        <Button content={"Clear board"} onClickHandler={onClearClick} />
        <Button content={"Hint"} />
        <Button content={"Surrender"} />
        <Button content={"Check"} />
        <Button content={"New game"} />
      </div>

      <RemainingNumbersBoard remainingNumbers={remainingNumbers} />
    </React.Fragment>
  );
};
