import { ReactNode } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";
import { About } from "../../Modals/About/About";
import { Rules } from "../../Modals/Rules/Rules";

export interface IHelpMenu {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const HelpMenu = ({ setShowModal }: IHelpMenu): JSX.Element => {
  const helpMenuItems: IMenuItem[] = [
    {
      id: "rules",
      content: <p>Rules</p>,
      onClick: () => {
        setShowModal(<Rules setShowModal={setShowModal} />);
      },
    },
    {
      id: "about",
      content: <p>About</p>,
      onClick: () => {
        setShowModal(<About setShowModal={setShowModal} />);
      },
    },
  ];

  return <Menu position={MenuPosition.right} menuItems={helpMenuItems} />;
};
