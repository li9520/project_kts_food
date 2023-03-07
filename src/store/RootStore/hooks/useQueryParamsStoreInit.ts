import { useEffect } from "react";

import { IReactionDisposer, reaction } from "mobx";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const navigate = useNavigate();
  const changeLocation: IReactionDisposer = reaction(
    () => rootStore.query.search,
    (search) => {
      navigate(`/?${search}`);
    }
  );

  useEffect(() => changeLocation, [changeLocation]);
  useEffect(() => {
    const params = {
      page: "1",
      query: "",
      type: "",
    };
    rootStore.query.setSearch(queryString.stringify(params));
  }, []);
};
