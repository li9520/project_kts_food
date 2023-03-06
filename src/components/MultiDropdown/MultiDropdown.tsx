import React from "react";

import DropDownStore from "@store/DropDownStore";
import { useLocalStore } from "@utils/useLocalStote";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import styles from "./MultiDropdown.module.scss";

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

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  pluralizeOptions,
  ...props
}) => {
  const dropDownClass = cn(styles.dropdown_header, {
    [styles.dropdown_disabled]: props.disabled,
  });

  const isChecked = (options: Option) => {
    const activeKeys = value.map((item) => item.key);
    return activeKeys.includes(options.key);
  };

  const handleClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentClicked = e.target.id;
    const activeOptions = e.target.checked
      ? [...value, ...options.filter((item) => currentClicked === item.key)]
      : value.filter((item) => currentClicked !== item.key);
    onChange && onChange(activeOptions);
  };

  const renderList = () => {
    return (
      <ul className={styles.dropdown_body}>
        {options.map(({ key, value }) => (
          <li key={key}>
            <input
              onChange={handleClick}
              id={key}
              name={key}
              type="checkbox"
              defaultChecked={isChecked({ key, value })}
            />
            <label className={styles.dropdown_item} htmlFor={key}>
              {value}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const dropDownStore = useLocalStore(() => new DropDownStore());
  const toggleDropdown = () => {
    dropDownStore.toggleIsOpen();
  };

  return (
    <div className={styles.dropDown}>
      <div className={dropDownClass} {...props} onClick={toggleDropdown}>
        {pluralizeOptions(value)}
      </div>
      {dropDownStore.isOpen && !props.disabled && renderList()}
    </div>
  );
};

export default observer(MultiDropdown);
