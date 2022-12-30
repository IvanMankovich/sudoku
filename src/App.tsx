import { Board } from "./components/Board/Board";
import { BoardGenerator } from "./helpers/boardGenerator";
import { Layout } from "./components/Layout/Layout";
import { Button } from "./components/Button/Button";
import { Select } from "./components/Select/Select";
import { useState } from "react";
import { difficulties } from "./constants/difficulties";
import { DifficulityLevel } from "./types/types";

function App() {
  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    DifficulityLevel.easy
  );
  const board = new BoardGenerator();
  const handleDifficultyChange = () => {
    setDifficulty(DifficulityLevel.easy);
  };

  return (
    <Layout>
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
        <Button content={"Start game"} />
        <Select
          label="Selected diffculty"
          options={difficulties}
          value={difficulty}
          onChange={handleDifficultyChange}
        />
      </div>
      <Board board={board.board} checkBoard={board.checkBoard.bind(board)} />
    </Layout>
  );
}

export default App;
