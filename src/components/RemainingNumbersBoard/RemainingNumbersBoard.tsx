import { NumbersDictionary } from "../../types/types";
import { NumberPlate } from "../NumberPlate/NumberPlate";
import "./RemainingNumbersBoard.scss";

export interface IRemainingNumbersBoard {
  remainingNumbers: NumbersDictionary;
}
export const RemainingNumbersBoard = ({
  remainingNumbers,
}: IRemainingNumbersBoard): JSX.Element => {
  const getNumberPlates = (
    remainingNumbers: NumbersDictionary
  ): JSX.Element[] => {
    const result: JSX.Element[] = [];
    for (let key in remainingNumbers) {
      result.push(
        <NumberPlate key={key} number={key} amount={remainingNumbers[key]} />
      );
    }
    return result;
  };
  const numbers: JSX.Element[] = getNumberPlates(remainingNumbers);

  return (
    <div>
      <p>Remaining Numbers Board:</p>
      <div className="remaining-numbers-board">{numbers}</div>
    </div>
  );
};
