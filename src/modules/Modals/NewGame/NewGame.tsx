import { ReactNode, useContext, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { Select } from "../../../components/Select/Select";
import { difficulttOptions } from "../../../constants/difficulties";
import { BoardStore } from "../../../store/BoardStore";
import { RootContext } from "../../../store/RootStore";
import { DifficulityLevel, GameState } from "../../../types/types";

export interface INewGameModal {
  board: BoardStore;
  gameState: GameState;
}

export const NewGame = ({ board, gameState }: INewGameModal): JSX.Element => {
  const { modalsStore } = useContext(RootContext);

  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    DifficulityLevel.easy
  );

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDifficulty(event.target.value as DifficulityLevel);
  };

  const actionBarContent: IMenuItem[] = [
    {
      id: "yes",
      content: "Yes",
      onClick: () => {
        // setGameState(GameState.inProgress);
        // setShowBoard(true);
        board.generateNewBoard(difficulty);
        modalsStore.setModal(null);
      },
    },
    {
      id: "no",
      content: "No",
      onClick: () => {
        modalsStore.setModal(null);
      },
    },
  ];

  const actionBar: ReactNode[] = actionBarContent.map(
    (item: IMenuItem): ReactNode => (
      <Button
        key={item.id}
        content={item.content}
        onClickHandler={item.onClick}
      />
    )
  );

  return (
    <Modal
      title="New game"
      content={
        <div>
          <p>
            Are you really want to start new game? Current game progress will be
            lost.
          </p>
          <Select
            label="Selected diffculty"
            options={difficulttOptions}
            value={difficulty}
            onChange={handleDifficultyChange}
          />
        </div>
      }
      actionBar={actionBar}
    />
  );
};
