import { ReactNode, useContext } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";
import { BoardStore } from "../../../store/BoardStore";
import { RootContext } from "../../../store/RootStore";
import { GameState } from "../../../types/types";
import { NewGame } from "../../Modals/NewGame/NewGame";

export interface IMainMenu {
  board: BoardStore;
  gameState: GameState;
}

export const MainMenu = ({ board, gameState }: IMainMenu): JSX.Element => {
  const { modalsStore } = useContext(RootContext);

  const mainMenuItems: IMenuItem[] = [
    {
      id: "close",
      content: <p>Close</p>,
      onClick: () => {
        modalsStore.setModal(null);
      },
    },
    {
      id: "newGame",
      content: <p>New game</p>,
      onClick: () => {
        modalsStore.setModal(<NewGame board={board} gameState={gameState} />);
      },
    },
  ];

  return <Menu position={MenuPosition.left} menuItems={mainMenuItems} />;
};
