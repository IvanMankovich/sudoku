import { Board } from "./components/Board/Board";
import { BoardGenerator } from "./helpers/boardGenerator";
import { Layout } from "./components/Layout/Layout";
import { Button } from "./components/Button/Button";
import { Select } from "./components/Select/Select";
import { useState } from "react";
import { difficulttOptions } from "./constants/difficulties";
import { DifficulityLevel, GameState, ICell } from "./types/types";

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.initial);
  const [difficulty, setDifficulty] = useState<DifficulityLevel>(
    DifficulityLevel.easy
  );
  const [boardState, setBoardState] = useState<BoardGenerator | null>(null);
  const [boardAnswer, setBoardAnswer] = useState<ICell[]>([]);

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDifficulty(event.target.value as DifficulityLevel);
  };
  const handleStartGameClick = (): void => {
    setGameState(GameState.inProgress);
    const newBoard: BoardGenerator = new BoardGenerator(difficulty);
    setBoardState(newBoard);
    setBoardAnswer(newBoard.boardAnswer);
  };
  const getCurrentBoardState = () => {
    console.log(boardState?.getCurrentState.call(boardState));
    if (boardState) {
      setBoardAnswer(boardState?.getCurrentState.call(boardState));
      console.log("sdfsdfsdf");
    }
  };

  const handleClearBoardClick = async () => {
    if (boardState) {
      let aaa = boardState?.clearBoard();
      console.log(aaa);
      setBoardAnswer(aaa);
    }
  };

  return (
    <Layout gameState={gameState}>
      {difficulty}
      {gameState === GameState.initial ? (
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
      {boardAnswer?.length && boardState ? (
        <Board
          board={boardAnswer}
          checkBoard={boardState.acceptAttempt.bind(boardState)}
          clearBoard={handleClearBoardClick}
          acceptAttempt={boardState.acceptAttempt.bind(boardState)}
          getCurrentBoardState={getCurrentBoardState}
        />
      ) : null}
    </Layout>
  );
}

export default App;
