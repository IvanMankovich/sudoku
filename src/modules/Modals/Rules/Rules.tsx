import { ReactNode, useContext } from "react";
import { Button } from "../../../components/Button/Button";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { RootContext } from "../../../store/RootStore";

export const Rules = (): JSX.Element => {
  const { modalsStore, boardStore } = useContext(RootContext);

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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
          perferendis tempore voluptate aperiam dolorum! Hic modi repellendus
          explicabo harum libero! Quidem officia adipisci sapiente itaque
          placeat consectetur dolor ut rerum.
        </p>
      }
      actionBar={actionBar}
    />
  );
};
