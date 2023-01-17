import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RootContext } from "../../store/RootStore";

export const TimerView = observer((): JSX.Element => {
  const { boardStore } = useContext(RootContext);

  return <p>{new Date(boardStore.timer.time).toISOString().slice(11, 19)}</p>;
});
