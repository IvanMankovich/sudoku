import { useState } from "react";
import "./Cell.scss";

export interface ICell {
  id: number;
  content: string;
  activeSquare: boolean;
  activeAxis: boolean;
  onCellClick(id: number): void;
}

export const Cell = ({
  id,
  content,
  activeSquare,
  activeAxis,
  onCellClick,
}: ICell) => {
  const [value, setValue] = useState<string>(content);
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
      onClick={(
        event: React.MouseEvent<HTMLInputElement, MouseEvent>
      ): void => {
        onCellClick(id);
      }}
      onFocus={(event: React.FocusEvent<HTMLInputElement, Element>): void => {
        onCellClick(id);
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.currentTarget.value);
      }}
    />
  );
};
