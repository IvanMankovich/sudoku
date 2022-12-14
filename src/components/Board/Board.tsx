import React, { ReactNode, useState } from "react";
import { BoardGenerator } from "../../helpers/BoardGenerator";
import {
  getColIndexes,
  getRandomElem,
  getRowIndexes,
  getSquareIndexes,
  isOddSquare,
} from "../../helpers/utils";
import { NewGame } from "../../modules/Modals/NewGame/NewGame";
import { NumbersDictionary } from "../../types/types";
import { Button } from "../Button/Button";
import { Cell } from "../Cell/Cell";
import { RemainingNumbersBoard } from "../RemainingNumbersBoard/RemainingNumbersBoard";

import "./Board.scss";

export interface IBoard {
  board: BoardGenerator;
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const Board = ({ board, setShowModal }: IBoard) => {
  const [selectedSquareInd, setSelectedSquareInd] = useState<number[]>([]);
  const [selectedRowInd, setSelectedRowInd] = useState<number[]>([]);
  const [selectedColInd, setSelectedColInd] = useState<number[]>([]);
  const [boardState, setBoardState] = useState<string[]>(board.boardAnswer);
  const [remainingNumbers, setRemainingNumbers] = useState(
    board.remainingNumbers
  );
  const [invalidCells, setInvalidCells] = useState<number[]>(
    board.invalidCells
  );

  const onCellClick = (ind: number): void => {
    const squareIndexes: number[] = getSquareIndexes(ind);
    const rowIndexes: number[] = getRowIndexes(ind);
    const colIndexes: number[] = getColIndexes(ind);
    setSelectedSquareInd(squareIndexes);
    setSelectedRowInd(rowIndexes);
    setSelectedColInd(colIndexes);
    setInvalidCells([]);
  };

  const onBlur = (id: number, value: string): void => {
    board.acceptAttempt?.(id, +value);

    setSelectedSquareInd([]);
    setSelectedRowInd([]);
    setSelectedColInd([]);
    setInvalidCells([]);
  };

  const onChange = (id: number, value: string): void => {
    const newBoard: string[] = [...boardState];
    const prevCellValue: string = boardState[id];
    newBoard[id] = value;
    setBoardState(newBoard);
    const isNewValueValid: boolean = Boolean(+value);
    const changableNum: string = isNewValueValid ? value : prevCellValue;
    const newRemainingNumbers: NumbersDictionary = {
      ...remainingNumbers,
      [changableNum]:
        remainingNumbers[changableNum] + (isNewValueValid ? -1 : 1),
    };
    if (isNewValueValid && +prevCellValue) {
      newRemainingNumbers[prevCellValue] =
        newRemainingNumbers[prevCellValue] + 1;
    }
    setRemainingNumbers(newRemainingNumbers);
    board.setRemainingNumbers(id, +value);
    board.acceptAttempt?.(id, +value);
    setInvalidCells([]);
  };

  const onClearClick = (): void => {
    setBoardState(board.board);
    setRemainingNumbers(board.remainingNumbersStored);
    board.clearBoard();
    setInvalidCells([]);
  };

  const onHintClick = (): void => {
    const freeCellIndexes: number[] = [];
    boardState.forEach((cellValue: string, ind: number): void => {
      cellValue === "0" && freeCellIndexes.push(ind);
    });
    const randomCellInd: number = getRandomElem(freeCellIndexes);
    const value: string = board.getCellValueByInd(randomCellInd);
    onChange(randomCellInd, value);
  };

  const onShowBoardClick = (): void => {
    board.showBoardSecret();
    setBoardState(board.boardAnswer);
    setRemainingNumbers(board.remainingNumbers);
    setInvalidCells([]);
  };

  const checkValidity = (): void => {
    board.checkBoard();
    setInvalidCells(board.getInvalidCells());
  };

  const onNewGameClick = (): void => {
    setShowModal(<NewGame setShowModal={setShowModal} />);
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
              isInvalid={Boolean(invalidCells.includes(id) && +num)}
            />
          ))}
        </div>
      </div>
      <div>
        <Button content={"Clear board"} onClickHandler={onClearClick} />
        <Button content={"Hint"} onClickHandler={onHintClick} />
        <Button content={"Show board"} onClickHandler={onShowBoardClick} />
        <Button content={"Check"} onClickHandler={checkValidity} />
        <Button content={"New game"} onClickHandler={onNewGameClick} />
      </div>

      <RemainingNumbersBoard remainingNumbers={remainingNumbers} />
    </React.Fragment>
  );
};
