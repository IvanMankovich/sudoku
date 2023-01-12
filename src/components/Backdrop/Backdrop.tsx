import { ReactNode, useRef } from "react";

import "./Backdrop.scss";

export interface IBackdrop {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  content: ReactNode;
}

export const Backdrop = ({ setShowModal, content }: IBackdrop) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="backdrop"
      ref={backdropRef}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === backdropRef.current) {
          setShowModal(null);
        }
      }}
    >
      {content}
    </div>
  );
};
