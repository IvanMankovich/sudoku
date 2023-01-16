import { ReactNode, useContext } from "react";
import { BoardStore } from "../../store/BoardStore";
import { HelpMenu } from "../../modules/Menus/HelpMenu/HelpMenu";
import { MainMenu } from "../../modules/Menus/MainMenu/MainMenu";
import { GameState } from "../../types/types";
import { Button } from "../Button/Button";

import "./Header.scss";
import { RootContext } from "../../store/RootStore";

export interface IHeader {
  gameState: GameState;
  board: BoardStore;
}

export const Header = ({ gameState, board }: IHeader) => {
  const { modalsStore } = useContext(RootContext);

  return (
    <header className="header">
      <div>
        <Button
          content="Menu"
          onClickHandler={() => {
            modalsStore.setModal(
              <MainMenu board={board} gameState={gameState} />
            );
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
            modalsStore.setModal(<HelpMenu />);
          }}
        />
      </div>
    </header>
  );
};
