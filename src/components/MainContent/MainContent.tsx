import React, { ReactNode } from "react";
import "./MainContent.scss";

export interface IMainContent {
  children: ReactNode;
}

export const MainContent = ({ children }: IMainContent) => {
  return <main className="main-content">{children}</main>;
};
