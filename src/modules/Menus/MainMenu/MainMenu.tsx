import { useContext } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";
import { RootContext } from "../../../store/RootStore";
import { NewGame } from "../../Modals/NewGame/NewGame";

export const MainMenu = (): JSX.Element => {
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
        modalsStore.setModal(<NewGame />);
      },
    },
  ];

  return <Menu position={MenuPosition.left} menuItems={mainMenuItems} />;
};
