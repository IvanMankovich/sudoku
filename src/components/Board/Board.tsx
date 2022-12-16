import { Row } from "../Row/Row";
import "./Board.scss";

export interface IBoard {
  board: string[][];
}
export const Board = ({ board }: IBoard) => {
  return (
    <div className="board">
      {board.map((row) => (
        <Row key={Math.random()} cells={row} />
      ))}
    </div>
  );
};
