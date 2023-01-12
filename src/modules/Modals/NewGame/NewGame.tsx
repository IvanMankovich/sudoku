import { ReactNode } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";

export interface INewGameModal {
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const NewGame = ({ setShowModal }: INewGameModal): JSX.Element => {
  const actionBarContent: IMenuItem[] = [
    {
      content: "Yes",
      onClick: () => {
        setShowModal(null);
      },
    },
    {
      content: "No",
      onClick: () => {
        setShowModal(null);
      },
    },
  ];

  const actionBar: ReactNode[] = actionBarContent.map(
    (item: IMenuItem): ReactNode => (
      <Button
        key={item.content}
        content={item.content}
        onClickHandler={item.onClick}
      />
    )
  );

  return <Modal title="Title" text="Text" actionBar={actionBar} />;
};
