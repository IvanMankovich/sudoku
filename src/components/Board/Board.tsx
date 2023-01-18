import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootContext } from "../../store/RootStore";
import { BoardStore } from "../../store/BoardStore";
import { isOddSquare } from "../../helpers/utils";
import { ResetBoard } from "../../modules/Modals/ResetBoard/ResetBoard";
import { Button } from "../Button/Button";
import { Cell } from "../Cell/Cell";
import { RemainingNumbersBoard } from "../RemainingNumbersBoard/RemainingNumbersBoard";

import "./Board.scss";

export interface IBoard {
  board: BoardStore;
}

export const Board = observer(({ board }: IBoard) => {
  const { modalsStore } = useContext(RootContext);

  const onCellClick = (ind: number): void => {
    board.onSelectCell(ind);
  };

  const onBlur = (): void => {
    board.onBlurCell();
  };

  const onChange = (id: number, value: string): void => {
    board.acceptAttempt(id, +value);
  };

  const onClearClick = (): void => {
    board.clearBoard();
  };

  const onHintClick = (): void => {
    board.getHint();
  };

  const onShowBoardClick = (): void => {
    board.showBoardSecret();
  };

  const checkValidity = (): void => {
    board.checkBoard();
  };

  const onResetBoardClick = (): void => {
    modalsStore.setModal(
      <ResetBoard
        onResetBoardConfirm={() => {
          board.generateNewBoard(board.difficultyLevel);
          board.clearBoard();
        }}
      />
    );
  };

  return (
    <React.Fragment>
      <div className="board-wrapper">
        <div className="board">
          {board.boardAnswer.map((num: string, id: number) => (
            <Cell
              key={id}
              content={+num}
              activeAxis={[
                ...board.selectedRowInd,
                ...board.selectedColInd,
              ].includes(id)}
              activeSquare={board.selectedSquareInd.includes(id)}
              onCellClick={onCellClick}
              onBlur={onBlur}
              id={id}
              oddSquare={isOddSquare(id)}
              disabled={board.getBoardCellValueByInd(id) !== "0"}
              onChange={onChange}
              isInvalid={Boolean(board.invalidCells.includes(id) && +num)}
            />
          ))}
        </div>
      </div>
      <div>
        <Button content={"Clear board"} onClickHandler={onClearClick} />
        <Button content={"Hint"} onClickHandler={onHintClick} />
        <Button content={"Show board"} onClickHandler={onShowBoardClick} />
        <Button content={"Check"} onClickHandler={checkValidity} />
        <Button content={"Reset board"} onClickHandler={onResetBoardClick} />
      </div>

      <RemainingNumbersBoard remainingNumbers={board.remainingNumbers} />
    </React.Fragment>
  );
});
