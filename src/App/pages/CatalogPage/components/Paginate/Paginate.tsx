import { useEffect } from "react";
import React from "react";

import { Button } from "@components/Button";
import { RecipeItemModel } from "@store/models/Food";
import PaginateStore from "@store/PaginateStore";
import { useLocalStore } from "@utils/useLocalStote";
import { observer } from "mobx-react-lite";

import styles from "./Paginate.module.scss";
import RecipesList from "../RecipesList";

export type PaginateProps = {
  recipes: RecipeItemModel[];
};

const recipesPerPage = 12;

const Paginate: React.FC<PaginateProps> = ({ recipes }) => {
  const paginateStore = useLocalStore(() => new PaginateStore());

  const numberRecipes = recipes.length;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [paginateStore.currentPage]);

  if (!numberRecipes) return <h1 className={styles.textCenter}>Not found</h1>;

  const lastRecipeIndex = paginateStore.currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
  const numberPages = Math.ceil(numberRecipes / recipesPerPage);

  const nextPage = () => {
    paginateStore.next();
  };

  const prevPage = () => {
    paginateStore.prev();
  };
  return (
    <div className={styles.catalog}>
      <RecipesList recipes={currentRecipes} />
      <div className={styles.catalog_paginate}>
        <Button disabled={paginateStore.currentPage === 1} onClick={prevPage}>
          Prev page
        </Button>
        <div className={styles.catalog_paginate_numbering}>
          {`${paginateStore.currentPage} / ${numberPages}`}
        </div>
        <Button
          disabled={paginateStore.currentPage === numberPages}
          onClick={nextPage}
        >
          Next page
        </Button>
      </div>
    </div>
  );
};

export default observer(Paginate);
