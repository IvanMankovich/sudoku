import { ReactNode } from "react";

import "./Backdrop.scss";

export interface IBackdrop {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  content: ReactNode;
}

export const Backdrop = ({ setShowModal, content }: IBackdrop) => {
  return (
    <div
      className="backdrop"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShowModal(false);
      }}
    >
      {content}
    </div>
  );
};
