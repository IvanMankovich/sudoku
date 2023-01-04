import { NumbersDictionary } from "../../types/types";
import { NumberPlate } from "../NumberPlate/NumberPlate";
import "./RestNumbersBoard.scss";

export interface IRestNumbersBoard {
  restNumbers: NumbersDictionary;
}
export const RestNumbersBoard = ({
  restNumbers,
}: IRestNumbersBoard): JSX.Element => {
  const getNumberPlates = (restNumbers: NumbersDictionary): JSX.Element[] => {
    const result: JSX.Element[] = [];
    for (let key in restNumbers) {
      result.push(<NumberPlate number={key} amount={restNumbers[key]} />);
    }
    return result;
  };
  const numbers: JSX.Element[] = getNumberPlates(restNumbers);

  return (
    <div>
      <p>Rest numbers board:</p>
      <div className="rest-numbers-board">{numbers}</div>
    </div>
  );
};
