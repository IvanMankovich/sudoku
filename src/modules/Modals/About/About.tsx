import { ReactNode, useContext } from "react";
import { Button } from "../../../components/Button/Button";
import { Link } from "../../../components/Link/Link";
import { IMenuItem } from "../../../components/Menu/MenuItem/MenuItem";
import { Modal } from "../../../components/Modal/Modal";
import { RootContext } from "../../../store/RootStore";

export const About = (): JSX.Element => {
  const { modalsStore, boardStore } = useContext(RootContext);

  const actionBarContent: IMenuItem[] = [
    {
      id: "close",
      content: "Close",
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
      title="About"
      content={
        <p>
          <Link
            href="https://github.com/IvanMankovich/sudoku/"
            title="Sudoku GitHub repository"
            text={"Project"}
          />{" "}
          was created with educational purposes. Feel free to{" "}
          <Link
            href="https://linkedin.com/in/ivan-mankovich/"
            title="Ivan Mankovich LinkedIn"
            text={"contact me"}
          />
        </p>
      }
      actionBar={actionBar}
    />
  );
};
