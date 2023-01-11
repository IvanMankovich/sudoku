import React, { ReactNode } from "react";
import { GameState } from "../../types/types";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import { Backdrop } from "../Backdrop/Backdrop";

import "./Layout.scss";

export interface ILayout {
  children: ReactNode;
  gameState: GameState;
  showModal: ReactNode | null;
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const Layout = ({
  children,
  gameState,
  showModal,
  setShowModal,
}: ILayout) => {
  return (
    <React.Fragment>
      <div className={`layout${showModal ? " blur" : ""}`}>
        <Header gameState={gameState} setShowModal={setShowModal} />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
      {showModal ? (
        <Backdrop setShowModal={setShowModal} content={showModal} />
      ) : null}
    </React.Fragment>
  );
};
