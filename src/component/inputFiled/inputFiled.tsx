import React, { useState } from "react";
import "./InputFiled.css";
interface IInputFiled {
  label: string;
  type?: string;
  extraClassName?: string;
  onChange?: (value: string) => void;
}

const InputFiled: React.FC<IInputFiled> = ({
  label,
  type = "text",
  onChange,
  extraClassName,
}) => {
  const [value, setValue] = useState("");
  const className = extraClassName
    ? "input-container " + extraClassName
    : "input-container";
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }
  return (
    <div className={className}>
      <input type={type} value={value} onChange={handleChange} />
      <label className={value && "filled"}>{label}</label>
    </div>
  );
};
export default InputFiled;
