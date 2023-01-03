import { useEffect, useState } from "react";
import "./Cell.scss";

export interface ICell {
  id: number;
  content?: number;
  activeSquare: boolean;
  activeAxis: boolean;
  onCellClick(id: number): void;
  onBlur(id: number, value: string): void;
  oddSquare: boolean;
  disabled?: boolean;
  onChange(id: number, value: string): void;
}

export const Cell = ({
  id,
  content,
  activeSquare,
  activeAxis,
  onCellClick,
  onBlur,
  oddSquare,
  disabled,
  onChange,
}: ICell) => {
  const [value, setValue] = useState<string>(content ? content.toString() : "");
  const className: string = "cell";

  useEffect(() => {
    setValue(content ? content.toString() : "");
  }, [content]);

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
        oddSquare ? "cell__odd-square" : "",
      ].join(" ")}
      value={value}
      disabled={disabled}
      onClick={(): void => {
        onCellClick(id);
      }}
      onFocus={(): void => {
        onCellClick(id);
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        const length: number = event.currentTarget.value.length;
        const value = event.currentTarget.value[length - 1];
        setValue(length ? value : "");
        onChange(id, length ? value : "0");
      }}
      onBlur={(event: React.FocusEvent<HTMLInputElement, Element>): void => {
        onBlur(id, content ? content.toString() : "0");
      }}
    />
  );
};
