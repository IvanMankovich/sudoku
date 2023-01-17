import React, { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import { Backdrop } from "../Backdrop/Backdrop";

import "./Layout.scss";

export interface ILayout {
  children: ReactNode;
  showModal: ReactNode | null;
}

export const Layout = ({ children, showModal }: ILayout) => {
  return (
    <React.Fragment>
      <div className={`layout${showModal ? " blur" : ""}`}>
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
      {showModal ? <Backdrop content={showModal} /> : null}
    </React.Fragment>
  );
};
