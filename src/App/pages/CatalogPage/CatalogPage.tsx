import React from "react";

import { Input } from "@components/Input/Input";
import FoodStore from "@store/FoodStore";
import { Meta } from "@store/FoodStore/types";
import QueryStore from "@store/QueryStore";
import { useLocalStore } from "@utils/useLocalStote";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./CatalogPage.module.scss";
import Paginate from "./components/Paginate";

const CatalogPage = () => {
  const foodStore = useLocalStore(() => new FoodStore());
  const queryStore = useLocalStore(() => new QueryStore());

  const navigate = useNavigate();
  const handleChangeValue = React.useCallback(
    (value: string) => {
      queryStore.setQuery(value);
      navigate(`/?search=${value}`);
    },
    [navigate, queryStore]
  );
  React.useEffect(() => {
    foodStore.getOrganizationRecipeList();
  }, [foodStore, navigate]);

  return (
    <div className={styles.catalogPage}>
      <Input
        value={queryStore.query}
        onChange={handleChangeValue}
        placeholder={"What are you looking for?"}
      />

      {foodStore.meta === Meta.success ? (
        <Paginate recipes={foodStore.list} />
      ) : (
        <Paginate loading />
      )}
    </div>
  );
};

export default observer(CatalogPage);
