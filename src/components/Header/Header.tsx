import { ReactNode } from "react";
import { BoardGenerator } from "../../helpers/BoardGenerator";
import { HelpMenu } from "../../modules/Menus/HelpMenu/HelpMenu";
import { MainMenu } from "../../modules/Menus/MainMenu/MainMenu";
import { GameState } from "../../types/types";
import { Button } from "../Button/Button";

import "./Header.scss";

export interface IHeader {
  gameState: GameState;
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  board: BoardGenerator;
}

export const Header = ({ gameState, setShowModal, board }: IHeader) => {
  return (
    <header className="header">
      <div>
        <Button
          content="Menu"
          onClickHandler={() => {
            setShowModal(
              <MainMenu setShowModal={setShowModal} board={board} />
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
            setShowModal(<HelpMenu setShowModal={setShowModal} />);
          }}
        />
      </div>
    </header>
  );
};
