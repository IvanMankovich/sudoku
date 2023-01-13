import { ReactNode } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";

export interface IHelpMenu {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const MainMenu = ({ setShowModal }: IHelpMenu): JSX.Element => {
  const mainMenuItems: IMenuItem[] = [
    {
      content: "Close",
      onClick: () => {
        setShowModal(null);
      },
    },
    {
      content: "New game",
      onClick: () => {
        setShowModal(null);
      },
    },
  ];

  return <Menu position={MenuPosition.left} menuItems={mainMenuItems} />;
};
