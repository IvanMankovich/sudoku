import { ReactNode, useContext, useRef } from "react";
import { RootContext } from "../../store/RootStore";
import { GameState } from "../../types/types";

import "./Backdrop.scss";

export interface IBackdrop {
  content: ReactNode;
}

export const Backdrop = ({ content }: IBackdrop) => {
  const { modalsStore, boardStore, generalStore } = useContext(RootContext);

  const backdropRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="backdrop"
      ref={backdropRef}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === backdropRef.current) {
          modalsStore.setModal(null);
          if (generalStore.gameState === GameState.inProgress) {
            boardStore.timer.run();
          }
        }
      }}
    >
      {content}
    </div>
  );
};
