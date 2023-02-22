import React from "react";

import cn from "classnames";

import "./Input.css";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  onChange,
  value,
  className,
  ...props
}) => {
  const inputClass = cn("input", className, {
    input_disabled: props.disabled,
  });

  const [text, setText] = React.useState(value);

  const handleClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.disabled) return;
    setText(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="text"
          onChange={handleClick}
          value={text || value}
          className={inputClass}
          {...props}
        />
      </label>
    </div>
  );
};
