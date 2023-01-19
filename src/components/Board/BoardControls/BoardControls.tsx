import { ReactNode } from "react";
import { BoardControlsBlock } from "./BoardControlsBlock";

export interface IBoardControlBlock {
  id: string;
  content: ReactNode | ReactNode[];
}

export interface IBoardControls {
  blocks: IBoardControlBlock[];
}

export const BoardControls = ({ blocks }: IBoardControls): JSX.Element => {
  const controlBlocks = blocks.map((block: IBoardControlBlock) => (
    <BoardControlsBlock key={block.id}>{block.content}</BoardControlsBlock>
  ));

  return <div className="board-controls">{controlBlocks}</div>;
};
