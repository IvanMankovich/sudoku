import { ReactNode, useContext } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { RootContext } from "../../../store/RootStore";

export interface IResetBoardModal {
  onResetBoardConfirm(): void;
}

export const ResetBoard = ({
  onResetBoardConfirm,
}: IResetBoardModal): JSX.Element => {
  const { modalsStore } = useContext(RootContext);

  const actionBarContent: IMenuItem[] = [
    {
      id: "yes",
      content: "Yes",
      onClick: () => {
        onResetBoardConfirm();
        modalsStore.setModal(null);
      },
    },
    {
      id: "no",
      content: "No",
      onClick: () => {
        modalsStore.setModal(null);
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
