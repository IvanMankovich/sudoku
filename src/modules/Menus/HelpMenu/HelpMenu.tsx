import { useContext } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";
import { RootContext } from "../../../store/RootStore";
import { GameState } from "../../../types/types";
import { About } from "../../Modals/About/About";
import { Rules } from "../../Modals/Rules/Rules";

export const HelpMenu = (): JSX.Element => {
  const { modalsStore, boardStore, generalStore } = useContext(RootContext);

  const helpMenuItems: IMenuItem[] = [
    {
      id: "close",
      content: <p className="close">+</p>,
      onClick: () => {
        if (generalStore.gameState === GameState.inProgress) {
          boardStore.timer.run();
        }
        modalsStore.setModal(null);
      },
    },
    {
      id: "rules",
      content: <p>Rules</p>,
      onClick: () => {
        modalsStore.setModal(<Rules />);
      },
    },
    {
      id: "about",
      content: <p>About</p>,
      onClick: () => {
        modalsStore.setModal(<About />);
      },
    },
  ];

  return <Menu position={MenuPosition.right} menuItems={helpMenuItems} />;
};
