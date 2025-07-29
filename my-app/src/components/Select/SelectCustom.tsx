import React from "react";
import "./SelectCustom.scss";

type SelectProps<T> = {
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  onChange: (selected: T | undefined) => void;
  value?: T;
  placeholder?: string;
};

function Select<T>({
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  value,
  placeholder = "Select an option...",
}: SelectProps<T>) {

  const selectedValue = value ? getOptionValue(value) : "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selected = options.find((opt) => getOptionValue(opt) === selectedValue);
    onChange(selected);
  };

  return (
    <select
      id="selector"
      className="custom-select"
      onChange={handleChange}
      value={selectedValue}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>

      {options.map((option, index) => (
        <option key={index} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
};

export default Select;
