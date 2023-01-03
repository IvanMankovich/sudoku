import { Board } from "./components/Board/Board";
import { BoardGenerator } from "./helpers/boardGenerator";
import { Layout } from "./components/Layout/Layout";
import { Button } from "./components/Button/Button";
import { Select } from "./components/Select/Select";
import { useState } from "react";
import { difficulttOptions } from "./constants/difficulties";
import { DifficulityLevel, GameState } from "./types/types";

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.initial);
  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    DifficulityLevel.easy
  );
  const [showBoard, setShowBoard] = useState<boolean>(false);

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDifficulty(event.target.value as DifficulityLevel);
  };
  const handleStartGameClick = (): void => {
    setGameState(GameState.inProgress);
    setShowBoard(true);
  };

  return (
    <Layout gameState={gameState}>
      {difficulty}
      {!showBoard ? (
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
      {showBoard ? <Board board={new BoardGenerator(difficulty)} /> : null}
    </Layout>
  );
}

export default App;
