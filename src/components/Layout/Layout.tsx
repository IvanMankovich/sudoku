import { ReactNode } from "react";
import { GameState } from "../../types/types";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import "./Layout.scss";

export interface ILayout {
  children: ReactNode;
  gameState: GameState;
}

export const Layout = ({ children, gameState }: ILayout) => {
  return (
    <div className="layout">
      <Header gameState={gameState} />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};
