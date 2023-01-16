import { ReactNode } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";
import { BoardGenerator } from "../../../helpers/BoardGenerator";
import { NewGame } from "../../Modals/NewGame/NewGame";

export interface IMainMenu {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  board: BoardGenerator;
}

export const MainMenu = ({ setShowModal, board }: IMainMenu): JSX.Element => {
  const mainMenuItems: IMenuItem[] = [
    {
      id: "close",
      content: <p>Close</p>,
      onClick: () => {
        setShowModal(null);
      },
    },
    {
      id: "newGame",
      content: <p>New game</p>,
      onClick: () => {
        setShowModal(<NewGame setShowModal={setShowModal} board={board} />);
      },
    },
  ];

  return <Menu position={MenuPosition.left} menuItems={mainMenuItems} />;
};
