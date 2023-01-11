import { ReactNode } from "react";
import { GameState } from "../../types/types";
import { Button } from "../Button/Button";
import { Menu } from "../Menu/Menu";
import { IMenuItem } from "../Menu/MenuItem/MenuItem";
import { MenuPosition } from "../Menu/types";

import "./Header.scss";

export interface IHeader {
  gameState: GameState;
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const Header = ({ gameState, setShowModal }: IHeader) => {
  const mainMenuItems: IMenuItem[] = [
    {
      content: "Close",
    },
    { content: "New game" },
  ];
  const mainMenu: ReactNode = (
    <Menu position={MenuPosition.left} menuItems={mainMenuItems} />
  );

  const helpMenuItems: IMenuItem[] = [
    {
      content: "Rules",
    },
    { content: "About" },
  ];
  const helpMenu: ReactNode = (
    <Menu position={MenuPosition.right} menuItems={helpMenuItems} />
  );
  return (
    <header className="header">
      <div>
        <Button
          content="Menu"
          onClickHandler={() => {
            setShowModal(mainMenu);
          }}
        />
      </div>
      {gameState !== GameState.initial ? (
        <div>
          <p>Time</p>
        </div>
      ) : null}
      <div>
        <Button
          content="Help"
          onClickHandler={() => {
            setShowModal(helpMenu);
          }}
        />
      </div>
    </header>
  );
};
