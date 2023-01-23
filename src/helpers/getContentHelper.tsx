import { ReactNode } from "react";
import { Board } from "../components/Board/Board";
import { WelcomeContent } from "../modules/WelcomeContent/WelcomeContent";
import { BoardStore } from "../store/BoardStore";
import { GameState } from "../types/types";

export const getContent = (
  gameState: GameState,
  board: BoardStore
): ReactNode | null => {
  switch (gameState) {
    case GameState.initial:
      return <WelcomeContent />;
    case GameState.inProgress:
      return <Board board={board} />;
    default:
      return null;
  }
};
