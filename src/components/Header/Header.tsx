import { useContext } from "react";
import { RootContext } from "../../store/RootStore";
import { HelpMenu } from "../../modules/Menus/HelpMenu/HelpMenu";
import { MainMenu } from "../../modules/Menus/MainMenu/MainMenu";
import { GameState } from "../../types/types";
import { Button } from "../Button/Button";
import { TimerRefresh } from "../TimerRefresh/TimerRefresh";
import { Switch } from "../Switch/Switch";
import { Theme } from "../../types/types";

import "./Header.scss";

export const Header = () => {
  const {
    modalsStore,
    generalStore,
    boardStore: { timer },
  } = useContext(RootContext);

  return (
    <header className="header-wrapper">
      <div className="header">
        <div className="header__left-block">
          <div>
            <Button
              content="Menu"
              onClickHandler={() => {
                timer.stop();
                modalsStore.setModal(<MainMenu />);
              }}
            />
          </div>
        </div>
        {generalStore.gameState !== GameState.initial ? (
          <div className="header__center-block">
            <TimerRefresh
              getTime={timer.getTime.bind(timer)}
              timerState={timer.state}
            />
          </div>
        ) : null}
        <div className="header__right-block">
          <Switch
            theme={generalStore.theme}
            checked={generalStore.theme === Theme.dark}
            onChange={() => generalStore.changeTheme()}
          />
          <Button
            content="Help"
            onClickHandler={() => {
              timer.stop();
              modalsStore.setModal(<HelpMenu />);
            }}
          />
        </div>
      </div>
    </header>
  );
};
