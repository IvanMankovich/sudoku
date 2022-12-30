import React from "react";

export interface ISelect {
  label?: string;
  value?: string;
  options: ISelectOption[];
  onChange?(...args: any[]): void;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export const Select = ({ label, value, options, onChange }: ISelect) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
