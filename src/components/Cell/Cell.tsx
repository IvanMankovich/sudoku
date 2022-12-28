import { useState } from "react";
import "./Cell.scss";

export interface ICell {
  id: number;
  content: string;
  activeSquare: boolean;
  activeAxis: boolean;
  onCellClick(id: number): void;
  onBlur(id: number, value: string): void;
}

export const Cell = ({
  id,
  content,
  activeSquare,
  activeAxis,
  onCellClick,
  onBlur,
}: ICell) => {
  const [value, setValue] = useState<string>(content !== "-" ? content : "");
  const className: string = "cell";

  return (
    <input
      type="number"
      min={1}
      max={9}
      minLength={1}
      maxLength={1}
      className={[
        className,
        activeAxis ? "cell__active-axis" : "",
        activeSquare ? "cell__active-square" : "",
      ].join(" ")}
      value={value}
      disabled={content !== "-"}
      onClick={(): void => {
        onCellClick(id);
      }}
      onFocus={(): void => {
        onCellClick(id);
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.currentTarget.value);
      }}
      onBlur={(): void => {
        onBlur(id, value);
      }}
    />
  );
};
