import "./NumberPlate.scss";

export interface INumberPlate {
  number: string;
  amount: number;
}

export const NumberPlate = ({ number, amount }: INumberPlate): JSX.Element => {
  return (
    <div className="number-plate">
      <p>{number}</p>
      <p>{amount}</p>
    </div>
  );
};
