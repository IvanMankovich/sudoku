import { ReactNode } from "react";
import "./Menu.scss";
import { IMenuItem, MenuItem } from "./MenuItem/MenuItem";
import { MenuPosition } from "./types";

export interface IMenu {
  position?: MenuPosition;
  menuItems: IMenuItem[];
}

export const Menu = ({
  position = MenuPosition.left,
  menuItems: items,
}: IMenu) => {
  return (
    <ul className={`menu menu__${position}`}>
      {items.map(
        (item: IMenuItem): ReactNode => (
          <MenuItem
            key={item.content}
            content={item.content}
            onClick={item.onClick}
          />
        )
      )}
    </ul>
  );
};
