import { ReactNode, useContext, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { Select } from "../../../components/Select/Select";
import { difficulttOptions } from "../../../constants/difficulties";
import { RootContext } from "../../../store/RootStore";
import { DifficulityLevel } from "../../../types/types";

export const NewGame = (): JSX.Element => {
  const { modalsStore, boardStore, generalStore } = useContext(RootContext);

  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    boardStore.difficultyLevel
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
        generalStore.setInProgressState();
        boardStore.generateNewBoard(difficulty);
        modalsStore.setModal(null);
      },
    },
    {
      id: "no",
      content: "No",
      onClick: () => {
        modalsStore.setModal(null);
        boardStore.timer.run();
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
