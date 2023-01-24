import "./Figure.scss";

export interface IFigure {
  imgSrc: string;
  alt?: string;
  figcaption: string;
}

export const Figure = ({
  imgSrc,
  alt = "",
  figcaption,
}: IFigure): JSX.Element => {
  return (
    <figure>
      <img src={imgSrc} alt={alt} />
      <figcaption>{figcaption}</figcaption>
    </figure>
  );
};
