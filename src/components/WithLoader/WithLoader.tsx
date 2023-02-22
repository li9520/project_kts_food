import React from "react";

import { Loader } from "../Loader/Loader";
import "./WithLoader.css";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading,
}: WithLoaderProps) => {
  const classNameDiv = "relative";
  const classNameLoader = "absolute center";

  return (
    <div className={classNameDiv}>
      {children}
      {loading && <Loader loading={loading} className={classNameLoader} />}
    </div>
  );
};
