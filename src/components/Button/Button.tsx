import React from "react";

import cn from "classnames";

import { Loader, LoaderSize } from "../Loader/Loader";

import "./Button.css";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  onClick,
  loading,
  children,
  className,
  ...props
}) => {
  let { disabled } = props;
  if (loading) {
    disabled = true;
  }
  // если кнопка заблокирована, переданный обработчик не вызывается
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    onClick && onClick(e);
  };

  const btnClass = cn("button", className, {
    button_disabled: disabled,
  });
  const loaderClass = cn("loader_white");

  return (
    <button
      type="button"
      onClick={handleClick}
      className={btnClass}
      disabled={disabled}
      {...props}
    >
      {loading && (
        <Loader loading={loading} size={LoaderSize.s} className={loaderClass} />
      )}
      {children}
    </button>
  );
};
