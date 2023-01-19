import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootContext } from "../../store/RootStore";
import { BoardStore } from "../../store/BoardStore";
import { isOddSquare } from "../../helpers/utils";
import { ResetBoard } from "../../modules/Modals/ResetBoard/ResetBoard";
import { Button } from "../Button/Button";
import { Cell } from "../Cell/Cell";
import { RemainingNumbersBoard } from "./RemainingNumbersBoard/RemainingNumbersBoard";
import {
  IBoardControlBlock,
  BoardControls,
} from "./BoardControls/BoardControls";
import { Congrats } from "../../modules/Modals/Congrats/Congrats";
import { empty } from "../../constants/boardGeneratorConstants";

import "./Board.scss";

export interface IBoard {
  board: BoardStore;
}

export const Board = observer(({ board }: IBoard) => {
  const { modalsStore, boardStore } = useContext(RootContext);

  useEffect(() => {
    if (boardStore.isSolved) {
      boardStore.timer.stop();
      modalsStore.setModal(<Congrats />);
    }
  }, [boardStore.isSolved, modalsStore, board, boardStore.timer]);

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

  const onCheckClick = (): void => {
    board.checkBoard();
  };

  const onResetBoardClick = (): void => {
    boardStore.timer.stop();
    modalsStore.setModal(
      <ResetBoard
        onResetBoardConfirm={() => {
          board.generateNewBoard(board.difficultyLevel);
          board.clearBoard();
        }}
      />
    );
  };

  const controlBlocks: IBoardControlBlock[] = [
    {
      id: "1",
      content: [
        <Button key="hint" content={"Hint"} onClickHandler={onHintClick} />,
        <Button key="check" content={"Check"} onClickHandler={onCheckClick} />,
      ],
    },
    {
      id: "2",
      content: [
        <Button
          key="clear"
          content={"Clear board"}
          onClickHandler={onClearClick}
        />,
        <Button
          key="reset"
          content={"Reset board"}
          onClickHandler={onResetBoardClick}
        />,
      ],
    },
  ];

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
              disabled={board.getBoardCellValueByInd(id) !== empty}
              onChange={onChange}
              isInvalid={Boolean(board.invalidCells.includes(id) && +num)}
            />
          ))}
        </div>
      </div>
      <BoardControls blocks={controlBlocks} />

      <RemainingNumbersBoard remainingNumbers={board.remainingNumbers} />
    </React.Fragment>
  );
});
