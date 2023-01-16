import { ReactNode, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { Select } from "../../../components/Select/Select";
import { difficulttOptions } from "../../../constants/difficulties";
import { BoardGenerator } from "../../../helpers/BoardGenerator";
import { DifficulityLevel } from "../../../types/types";

export interface INewGameModal {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  board: BoardGenerator;
}

export const NewGame = ({
  setShowModal,
  board,
}: INewGameModal): JSX.Element => {
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
        board.generateNewBoard(difficulty);
        setShowModal(null);
      },
    },
    {
      id: "no",
      content: "No",
      onClick: () => {
        setShowModal(null);
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
