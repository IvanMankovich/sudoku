import { useEffect, useState } from "react";
import { Theme } from "../../types/types";
import "./Switch.scss";

export interface ISwitch {
  theme: Theme;
  checked: boolean;
  onChange(): void;
}

export const Switch = ({ checked, onChange }: ISwitch) => {
  const [value, setValue] = useState<boolean>(checked);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  return (
    <label className="switch">
      <input
        onChange={(_event: React.ChangeEvent<HTMLInputElement>): void => {
          setValue((prev) => !prev);
          onChange();
        }}
        checked={value}
        type="checkbox"
      />
      <span className="slider"></span>
    </label>
  );
};
