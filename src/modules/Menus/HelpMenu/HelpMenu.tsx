import { ReactNode } from "react";
import { Menu } from "../../../components/Menu/Menu";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { MenuPosition } from "../../../components/Menu/types";
import { About } from "../../Modals/About/About";
import { Rules } from "../../Modals/Rules/Rules";
// import { useModal } from "../../../hooks/useModal";

export interface IHelpMenu {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const HelpMenu = ({ setShowModal }: IHelpMenu): JSX.Element => {
  // const { setShowModal } = useModal();

  const helpMenuItems: IMenuItem[] = [
    {
      content: "Rules",
      onClick: () => {
        setShowModal(<Rules setShowModal={setShowModal} />);
      },
    },
    {
      content: "About",
      onClick: () => {
        setShowModal(<About setShowModal={setShowModal} />);
      },
    },
  ];

  return <Menu position={MenuPosition.right} menuItems={helpMenuItems} />;
};
