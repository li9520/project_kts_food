import React from "react";

import { Input } from "@components/Input/Input";
import MultiDropdown, { Option } from "@components/MultiDropdown";
import FoodStore from "@store/FoodStore";
import { Meta } from "@store/FoodStore/types";
import QueryStore from "@store/QueryStore";
import { useLocalStore } from "@utils/useLocalStote";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./CatalogPage.module.scss";
import Paginate from "./components/Paginate";

const CatalogPage = () => {
  const foodStore = useLocalStore(() => new FoodStore());
  const queryStore = useLocalStore(() => new QueryStore());

  const [, setSearchParams] = useSearchParams();

  const handleChangeSearch = React.useCallback(
    (value: string) => {
      queryStore.setSearch(value);
      setSearchParams((searchParams) => {
        searchParams.set("search", value);
        return searchParams;
      });
    },
    [queryStore, setSearchParams]
  );

  const handleChangeType = React.useCallback(
    (options: Option[]) => {
      queryStore.setType(options);
      const type = options.map((item) => item.key).join(" ");
      setSearchParams((searchParams) => {
        searchParams.set("type", type);
        return searchParams;
      });
    },
    [queryStore, setSearchParams]
  );

  React.useEffect(() => {
    foodStore.getOrganizationRecipeList();
  }, [foodStore]);

  const types: Option[] = [
    { key: "main course", value: "main course" },
    { key: "side dish", value: "side dish" },
    { key: "appetizer", value: "appetizer" },
    { key: "dessert", value: "dessert" },
    { key: "salad", value: "salad" },
    { key: "bread", value: "bread" },
    { key: "breakfast", value: "breakfast" },
    { key: "soup", value: "soup" },
    { key: "beverage", value: "beverage" },
    { key: "sauce", value: "sauce" },
    { key: "marinade", value: "marinade" },
    { key: "fingerfood", value: "fingerfood" },
    { key: "snack", value: "snack" },
    { key: "drink", value: "drink" },
  ];

  return (
    <div className={styles.catalogPage}>
      <Input
        value={queryStore.search}
        onChange={handleChangeSearch}
        placeholder={"What are you looking for?"}
      />
      <MultiDropdown
        options={types}
        value={queryStore.type}
        onChange={handleChangeType}
        pluralizeOptions={(values: Option[]) =>
          values.length === 0 ? "Выберите тип" : `Выбрано: ${values.length}`
        }
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
