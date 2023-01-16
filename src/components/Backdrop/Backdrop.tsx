import { ReactNode, useContext, useRef } from "react";
import { RootContext } from "../../store/RootStore";

import "./Backdrop.scss";

export interface IBackdrop {
  content: ReactNode;
}

export const Backdrop = ({ content }: IBackdrop) => {
  const { modalsStore } = useContext(RootContext);

  const backdropRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="backdrop"
      ref={backdropRef}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === backdropRef.current) {
          modalsStore.setModal(null);
        }
      }}
    >
      {content}
    </div>
  );
};
