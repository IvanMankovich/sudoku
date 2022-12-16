import "./Cell.scss";

export interface ICell {
  content: string;
}

export const Cell = ({ content }: ICell) => {
  return <div className="cell">{content}</div>;
};
