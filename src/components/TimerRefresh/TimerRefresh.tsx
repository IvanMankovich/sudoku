import { useEffect, useState } from "react";
import { TimerState } from "../../helpers/Timer";

export interface ITimerRefresh {
  getTime(): number;
  timerState: TimerState;
}

export const TimerRefresh = ({
  getTime,
  timerState,
}: ITimerRefresh): JSX.Element => {
  const [time, setTime] = useState<number>(getTime());

  useEffect(() => {
    if (timerState === TimerState.running) {
      const tick = setInterval(() => {
        setTime(getTime());
      }, 1000);

      return () => {
        clearInterval(tick);
      };
    }
  }, [timerState, getTime]);

  return <p>{new Date(time).toISOString().slice(11, 19)}</p>;
};
