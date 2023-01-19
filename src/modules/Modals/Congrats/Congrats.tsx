import { ReactNode, useContext } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { getTime } from "../../../helpers/utils";
import { RootContext } from "../../../store/RootStore";
import { NewGame } from "../NewGame/NewGame";

export const Congrats = (): JSX.Element => {
  const { modalsStore, generalStore, boardStore } = useContext(RootContext);

  const actionBarContent: IMenuItem[] = [
    {
      id: "yes",
      content: "Sure!",
      onClick: () => {
        modalsStore.setModal(<NewGame />);
      },
    },
    {
      id: "no",
      content: "Not now",
      onClick: () => {
        modalsStore.setModal(null);
        generalStore.setInitialState();
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
      title="You win"
      content={
        <p>{`Board solved in ${getTime(
          boardStore.timer.getTime()
        )}. Do you want to play more?`}</p>
      }
      actionBar={actionBar}
    />
  );
};
