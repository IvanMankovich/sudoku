import React, { ReactNode } from "react";

export interface IBoardControlsBlock {
  children: ReactNode | ReactNode[];
}

export const BoardControlsBlock = ({
  children,
}: IBoardControlsBlock): JSX.Element => {
  return <div className="board-controls-block">{children}</div>;
};
