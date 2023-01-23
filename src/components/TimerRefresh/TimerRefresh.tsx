import { useEffect, useState } from "react";
import { TimerState } from "../../helpers/Timer";
import { getTime as parseTime } from "../../helpers/utils";

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
      /** interval set up to 500ms for smooth updating time on starting new game */
      const tick: NodeJS.Timer = setInterval((): void => {
        setTime(getTime());
      }, 500);

      return () => {
        clearInterval(tick);
      };
    }
  }, [timerState, getTime]);

  return <p>{parseTime(time)}</p>;
};
