import React from "react";
import { BoardGenerator } from "../../helpers/boardGenerator";

export const Board = () => {
  const board = new BoardGenerator();

  console.log(board._secret);
  return <div>Board</div>;
};
