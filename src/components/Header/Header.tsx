import { useContext } from "react";
import { RootContext } from "../../store/RootStore";
import { HelpMenu } from "../../modules/Menus/HelpMenu/HelpMenu";
import { MainMenu } from "../../modules/Menus/MainMenu/MainMenu";
import { GameState } from "../../types/types";
import { Button } from "../Button/Button";
import { TimerRefresh } from "../TimerRefresh/TimerRefresh";

import "./Header.scss";
import { Switch } from "../Switch/Switch";

export const Header = () => {
  const {
    modalsStore,
    generalStore,
    boardStore: { timer },
  } = useContext(RootContext);

  return (
    <header className="header">
      <div>
        <Button
          content="Menu"
          onClickHandler={() => {
            timer.stop();
            modalsStore.setModal(<MainMenu />);
          }}
        />
      </div>
      {generalStore.gameState !== GameState.initial ? (
        <div>
          <TimerRefresh
            getTime={timer.getTime.bind(timer)}
            timerState={timer.state}
          />
        </div>
      ) : null}
      <div>
        <Switch />
      </div>
      <div>
        <Button
          content="Help"
          onClickHandler={() => {
            timer.stop();
            modalsStore.setModal(<HelpMenu />);
          }}
        />
      </div>
    </header>
  );
};
