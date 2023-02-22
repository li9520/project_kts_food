import React from "react";

import cn from "classnames";
import "./MultiDropdown.css";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  pluralizeOptions,
  ...props
}) => {
  const dropDownClass = cn("dropdown_header", {
    dropdown_disabled: props.disabled,
  });

  const isChecked = (options: Option) => {
    const activeKeys = value.map((item) => item.key);
    return activeKeys.includes(options.key);
  };

  const [checkedState, setCheckedState] = React.useState(
    value.map((item) => item.key)
  );

  const handleClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentClicked = e.target.id;
    if (e.target.checked) {
      setCheckedState((prev) => [...prev, currentClicked]);
      const activeOptions = options.filter(
        (item) => currentClicked === item.key
      );
      onChange && onChange(activeOptions);
      return;
    }

    const newCheckedState = checkedState.filter((item) => item !== e.target.id);
    setCheckedState(newCheckedState);

    const activeOptions = options.filter((item) =>
      newCheckedState.includes(item.key)
    );
    onChange && onChange(activeOptions);
  };

  const [isOpen, setOpen] = React.useState(false);
  const toggleDropdown = () => setOpen(!isOpen);

  const renderList = () => {
    return (
      <ul className="dropdown_body">
        {options.map(({ key, value }) => (
          <li key={key}>
            <input
              onChange={handleClick}
              id={key}
              name={key}
              type="checkbox"
              defaultChecked={isChecked({ key, value })}
            />
            <label className="dropdown_item" htmlFor={key}>
              {value}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="multi-dropdown">
      <div className={dropDownClass} {...props} onClick={toggleDropdown}>
        {pluralizeOptions(value)}
      </div>
      {isOpen && !props.disabled && renderList()}
    </div>
  );
};
