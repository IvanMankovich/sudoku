import { Cell } from "../Cell/Cell";
import "./Row.scss";

export interface IRow {
  cells: string[];
}

export const Row = ({ cells }: IRow) => {
  return (
    <div className="row">
      {cells.map((cell) => (
        <Cell key={Math.random()} content={cell} />
      ))}
    </div>
  );
};
