import { ReactNode } from "react";
import "./Modal.scss";

export interface IModal {
  title?: string;
  text?: string;
  actionBar?: ReactNode[];
}

export const Modal = ({ title, text, actionBar }: IModal) => {
  return (
    <div className="modal">
      {title ? (
        <header className="modal-header">
          <p>{title}</p>
        </header>
      ) : null}
      {text ? (
        <div className="modal-content">
          <p>{text}</p>
        </div>
      ) : null}
      {actionBar ? <footer className="modal-bar">{actionBar}</footer> : null}
    </div>
  );
};
