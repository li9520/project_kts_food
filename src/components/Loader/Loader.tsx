import React from "react";

import "./Loader.css";
import cn from "classnames";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  size = LoaderSize.m,
  loading = true,
  className = "",
}: LoaderProps) => {
  if (!loading) {
    return null;
  }

  const loaderClass = cn("loader", className, `loader_${size}`);

  return <div className={loaderClass}> </div>;
};
