import "./MenuItem.scss";

export interface IMenuItem {
  content: string;
  onClick?(...args: any[]): void;
}

export const MenuItem = ({ content, onClick }: IMenuItem) => {
  return (
    <ul className="menu-item" onClick={onClick}>
      <p>{content}</p>
    </ul>
  );
};
