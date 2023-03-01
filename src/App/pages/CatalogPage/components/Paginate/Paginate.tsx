import { useEffect, useState } from "react";

import { Button } from "@components/Button";
import { Loader, LoaderSize } from "@components/Loader";

import styles from "./Paginate.module.scss";
import RecipesList, { RecipeProps } from "../RecipesList";

export type PaginateProps = {
  results: RecipeProps[];
};

const Paginate: React.FC<PaginateProps> = ({ results }) => {
  const recipes = results;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const numberRecipes = recipes.length;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setLoading(false);
  }, [currentPage]);

  if (loading) return <Loader size={LoaderSize.l} />;

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
  const numberPages = Math.ceil(numberRecipes / recipesPerPage);

  const nextPage = () => {
    setLoading(true);
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setLoading(true);
    setCurrentPage((prev) => prev - 1);
  };
  return (
    !loading && (
      <div className={styles.catalog}>
        <RecipesList recipes={currentRecipes} />
        <div className={styles.catalog_paginate}>
          <Button disabled={currentPage === 1} onClick={prevPage}>
            Prev page
          </Button>
          <div className={styles.catalog_paginate_numbering}>
            {`${currentPage} / ${numberPages}`}
          </div>
          <Button disabled={currentPage === numberPages} onClick={nextPage}>
            Next page
          </Button>
        </div>
      </div>
    )
  );
};

export default Paginate;
