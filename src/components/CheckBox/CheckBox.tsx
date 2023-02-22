import React from "react";

import cn from "classnames";

import "./CheckBox.css";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  ...props
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.disabled) return;
    setIsChecked(!isChecked);
    onChange && onChange(e.target.checked);
  };
  const checkBoxClass = cn("checkbox", {
    checkbox_disabled: props.disabled,
  });
  return (
    <input
      className={checkBoxClass}
      onChange={handleChange}
      checked={isChecked}
      type="checkbox"
      {...props}
    />
  );
};
