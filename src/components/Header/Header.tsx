import { GameState } from "../../types/types";
import "./Header.scss";

export interface IHeader {
  gameState: GameState;
}

export const Header = ({ gameState }: IHeader) => {
  return (
    <header className="header">
      <div>
        <p>Menu</p>
      </div>
      {gameState !== GameState.initial ? (
        <div>
          <p>Time</p>
        </div>
      ) : null}
      <div>
        <p>Help</p>
      </div>
    </header>
  );
};
