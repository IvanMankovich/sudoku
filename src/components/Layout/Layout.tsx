import React, { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import { Backdrop } from "../Backdrop/Backdrop";
import { Theme } from "../../types/types";

import "./Layout.scss";

export interface ILayout {
  children: ReactNode;
  showModal: ReactNode | null;
  theme: Theme;
}

export const Layout = ({ children, showModal, theme }: ILayout) => {
  return (
    <div className={`theme-${theme}`}>
      <div className={`layout${showModal ? " blur" : ""}`}>
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
      {showModal ? <Backdrop content={showModal} /> : null}
    </div>
  );
};
