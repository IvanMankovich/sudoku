import { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import "./Layout.scss";

export interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return (
    <div className="layout">
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};
