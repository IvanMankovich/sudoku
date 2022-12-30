import { ReactNode } from "react";
import "./Button.scss";

export interface IButton {
  content: ReactNode;
  onClickHandler?(...args: any[]): void;
}

export const Button = ({ content, onClickHandler }: IButton) => {
  return (
    <button className="btn" onClick={onClickHandler}>
      {content}
    </button>
  );
};
