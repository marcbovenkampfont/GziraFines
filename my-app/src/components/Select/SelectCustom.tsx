import React from "react";
import "./SelectCustom.scss";

type SelectProps<T> = {
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  onChange: (selected: T | T[] | undefined) => void;
  value?: T | T[];
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
};

function Select<T>({
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  value,
  placeholder = "Select an option...",
  disabled = false,
  isMulti = false,
}: SelectProps<T>) {
  const isArrayValue = Array.isArray(value);
  const selectedValues = isMulti && isArrayValue
    ? value.map(getOptionValue)
    : !isMulti && value
    ? getOptionValue(value as T)
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isMulti) {
      const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
      const selectedOptions = options.filter(opt =>
        selected.includes(getOptionValue(opt))
      );
      console.log("SELECTED OPTIOS", selectedOptions)
      onChange(selectedOptions);
    } else {
      const selectedValue = e.target.value;
      const selected = options.find(
        (opt) => getOptionValue(opt) === selectedValue
      );
      onChange(selected);
    }
  };

  return (
    <select
      id="selector"
      className="custom-select"
      onChange={handleChange}
      value={selectedValues}
      disabled={disabled}
      multiple={isMulti}
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
