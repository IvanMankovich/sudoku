import { useContext } from "react";
import { RootContext } from "../../store/RootStore";
import { HelpMenu } from "../../modules/Menus/HelpMenu/HelpMenu";
import { MainMenu } from "../../modules/Menus/MainMenu/MainMenu";
import { GameState } from "../../types/types";
import { Button } from "../Button/Button";

import "./Header.scss";

export const Header = () => {
  const { modalsStore, generalStore } = useContext(RootContext);

  return (
    <header className="header">
      <div>
        <Button
          content="Menu"
          onClickHandler={() => {
            modalsStore.setModal(<MainMenu />);
          }}
        />
      </div>
      {generalStore.gameState !== GameState.initial ? (
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
