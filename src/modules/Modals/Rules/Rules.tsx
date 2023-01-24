import { ReactNode, useContext } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { RootContext } from "../../../store/RootStore";
import { Theme } from "../../../types/types";
import { Figure } from "../../../components/Figure/Figure";

import dark from "./../../../static-assets/images/dark-foc.png";
import light from "./../../../static-assets/images/light-foc.png";
import darkRemNum from "./../../../static-assets/images/dark-rem-num.png";
import lightRemNum from "./../../../static-assets/images/light-rem-num.png";

export const Rules = (): JSX.Element => {
  const { modalsStore, boardStore, generalStore } = useContext(RootContext);

  const actionBarContent: IMenuItem[] = [
    {
      id: "understand",
      content: "I understand",
      onClick: () => {
        modalsStore.setModal(null);
        boardStore.timer.run();
      },
    },
  ];

  const actionBar: ReactNode[] = actionBarContent.map(
    (item: IMenuItem): ReactNode => (
      <Button
        key={item.id}
        content={item.content}
        onClickHandler={item.onClick}
      />
    )
  );

  return (
    <Modal
      title="Rules"
      content={
        <div className="rules">
          <p className="rules_text">
            {`The rules for sudoku are simple. A 9x9 square must be filled in with
          numbers from 1-9 with no repeated numbers in each line, horizontally
          or vertically. To challenge you more, there are 3x3 squares marked out
          in the grid, and each of these squares can't have any repeat numbers
          either.`}
          </p>
          <Figure
            imgSrc={generalStore.theme === Theme.dark ? dark : light}
            alt="Sudoku board"
            figcaption={"Sudoku board you need to fill"}
          />
          <Figure
            imgSrc={
              generalStore.theme === Theme.dark ? darkRemNum : lightRemNum
            }
            alt="Sudoku remaining numbers"
            figcaption={
              "Remaining numbers borad (number/amount of remaining numbers)"
            }
          />
        </div>
      }
      actionBar={actionBar}
    />
  );
};
