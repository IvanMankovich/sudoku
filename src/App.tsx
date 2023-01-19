import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootContext } from "./store/RootStore";

import { Board } from "./components/Board/Board";
import { Layout } from "./components/Layout/Layout";
import { Button } from "./components/Button/Button";
import { Select } from "./components/Select/Select";
import { difficulttOptions } from "./constants/difficulties";
import { DifficulityLevel, GameState } from "./types/types";

const App = observer((): JSX.Element => {
  const { boardStore, generalStore, modalsStore } = useContext(RootContext);
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
    <Layout showModal={modalsStore.modal}>
      {generalStore.gameState === GameState.initial ? (
        <div>
          <section>
            <h2>Welcome sudoku</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id totam
              eum ea amet fugit quod, sapiente tenetur quibusdam minima beatae
              possimus eos, quia maxime nihil consequuntur. Dignissimos ab iste
              dolores!
            </p>
          </section>
          <Button
            content={"Start game"}
            onClickHandler={handleStartGameClick}
          />
          <Select
            label="Selected diffculty"
            options={difficulttOptions}
            value={difficulty}
            onChange={handleDifficultyChange}
          />
        </div>
      ) : null}
      {generalStore.gameState === GameState.inProgress ||
      generalStore.gameState === GameState.paused ? (
        <Board board={boardStore} />
      ) : null}
    </Layout>
  );
});

export default App;
