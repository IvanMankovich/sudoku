import { useState } from "react";
import { useModal } from "./hooks/useModal";
import { Board } from "./components/Board/Board";
import { BoardGenerator } from "./helpers/BoardGenerator";
import { Layout } from "./components/Layout/Layout";
import { Button } from "./components/Button/Button";
import { Select } from "./components/Select/Select";
import { difficulttOptions } from "./constants/difficulties";
import { DifficulityLevel, GameState } from "./types/types";

function App() {
  const { showModal, setShowModal } = useModal();
  const [gameState, setGameState] = useState<GameState>(GameState.initial);
  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    DifficulityLevel.easy
  );
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [board] = useState<BoardGenerator>(new BoardGenerator());

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDifficulty(event.target.value as DifficulityLevel);
  };

  const handleStartGameClick = (): void => {
    board.generateNewBoard(difficulty);
    setGameState(GameState.inProgress);
    setShowBoard(true);
  };

  return (
    <Layout
      gameState={gameState}
      setShowModal={setShowModal}
      showModal={showModal}
      board={board}
    >
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
      {showBoard ? <Board board={board} setShowModal={setShowModal} /> : null}
    </Layout>
  );
}

export default App;
