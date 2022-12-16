import { Board } from "./components/Board/Board";
import { BoardGenerator } from "./helpers/boardGenerator";

function App() {
  const board = new BoardGenerator();

  return (
    <div className="App">
      <Board board={board.board} />
      <p>Secret</p>
      <Board board={board.boardSecret} />
    </div>
  );
}

export default App;
