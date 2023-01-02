import "./Select.scss";

export interface ISelect {
  label?: string;
  value?: string;
  options: ISelectOption[];
  onChange?(...args: any[]): void;
  id?: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export const Select = ({
  label,
  value,
  options,
  onChange,
  id = Math.random().toString(),
}: ISelect) => {
  return (
    <div className="select-wrapper">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select value={value} onChange={onChange} id={id}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
