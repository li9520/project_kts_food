import React from "react";

import { Input } from "@components/Input/Input";
import { Option } from "@components/MultiDropdown";
import FoodStore from "@store/FoodStore";
import { Meta } from "@store/FoodStore/types";
import QueryStore from "@store/QueryStore";
import { useLocalStore } from "@utils/useLocalStote";
import { observer } from "mobx-react-lite";

import styles from "./CatalogPage.module.scss";
import Filter from "./components/Filter";
import Paginate from "./components/Paginate";

const CatalogPage = () => {
  const foodStore = useLocalStore(() => new FoodStore());
  const queryStore = useLocalStore(() => new QueryStore());

  const handleChangeSearch = React.useCallback(
    (value: string) => {
      queryStore.setSearch(value);
    },
    [queryStore]
  );

  const handleChangeType = React.useCallback(
    (options: Option[]) => {
      queryStore.setType(options);
    },
    [queryStore]
  );

  React.useEffect(() => {
    foodStore.getOrganizationRecipeList();
  }, [foodStore]);

  return (
    <div className={styles.catalogPage}>
      <Input
        value={queryStore.search}
        onChange={handleChangeSearch}
        placeholder={"What are you looking for?"}
      />

      <Filter filter={queryStore.type} setFilter={handleChangeType} />

      {foodStore.meta === Meta.success ? (
        <Paginate recipes={foodStore.list} />
      ) : (
        <Paginate loading />
      )}
    </div>
  );
};

export default observer(CatalogPage);
