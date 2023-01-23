import React from "react";
import { useContext, useState } from "react";
import { RootContext } from "../../store/RootStore";

import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import { difficulttOptions } from "../../constants/difficulties";
import { DifficulityLevel } from "../../types/types";

export const WelcomeContent = () => {
  const { boardStore, generalStore } = useContext(RootContext);

  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    DifficulityLevel.easy
  );

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDifficulty(event.target.value as DifficulityLevel);
  };

  const handleStartGameClick = (): void => {
    boardStore.generateNewBoard(difficulty);
    generalStore.setInProgressState();
  };

  return (
    <div className="welcome-content">
      <div>
        <h2>Welcome sudoku</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id totam eum
          ea amet fugit quod, sapiente tenetur quibusdam minima beatae possimus
          eos, quia maxime nihil consequuntur. Dignissimos ab iste dolores!
        </p>
      </div>
      <Button content={"Start game"} onClickHandler={handleStartGameClick} />
      <Select
        label="Selected diffculty"
        options={difficulttOptions}
        value={difficulty}
        onChange={handleDifficultyChange}
      />
    </div>
  );
};
