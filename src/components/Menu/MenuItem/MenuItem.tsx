import { ReactNode } from "react";
import "./MenuItem.scss";

export interface IMenuItem {
  id: string;
  content: ReactNode | ReactNode[];
  onClick?(...args: any[]): void;
}

export const MenuItem = ({ content, onClick }: IMenuItem) => {
  return (
    <li className="menu-item" onClick={onClick}>
      {content}
    </li>
  );
};
