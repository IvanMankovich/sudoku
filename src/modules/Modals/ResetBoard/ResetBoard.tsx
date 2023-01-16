import { ReactNode } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";

export interface IResetBoardModal {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  onResetBoardConfirm(): void;
}

export const ResetBoard = ({
  setShowModal,
  onResetBoardConfirm: onNewGameConfirm,
}: IResetBoardModal): JSX.Element => {
  const actionBarContent: IMenuItem[] = [
    {
      id: "yes",
      content: "Yes",
      onClick: () => {
        onNewGameConfirm();
        setShowModal(null);
      },
    },
    {
      id: "no",
      content: "No",
      onClick: () => {
        setShowModal(null);
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
      title="Reset board game"
      content={
        <p>
          Do you really want to reset board? Current game progress will be lost.
        </p>
      }
      actionBar={actionBar}
    />
  );
};
