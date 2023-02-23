import { useEffect, useState } from "react";

import { Button } from "@components/Button";
import { Loader, LoaderSize } from "@components/Loader";
import { API_KEY } from "@config/api";
import axios from "axios";

import styles from "./CatalogPage.module.scss";
import RecipesList, { RecipeProps } from "./components/RecipesList";

const CatalogPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<RecipeProps[]>([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const [NumberRecipes] = useState(100);

  const fetchData = async () => {
    await axios({
      method: "get",
      url: `https://api.spoonacular.com/recipes/complexSearch?number=${NumberRecipes}&apiKey=${API_KEY}`,
    })
      .then((response) => {
        setCards(
          response.data.results.map(
            (item: { id: any; image: any; title: any }) => ({
              id: item.id,
              image: item.image,
              title: item.title,
            })
          )
        );
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cards.length !== 0) {
      window.scrollTo({ top: 0 });
      setLoading(false);
    }
  }, [currentPage]);

  if (loading) return <Loader size={LoaderSize.l} />;
  if (error) return <div>error!</div>;

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = cards.slice(firstRecipeIndex, lastRecipeIndex);
  const numberPages = Math.ceil(NumberRecipes / recipesPerPage);

  const nextPage = () => {
    setLoading(true);
    setcurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setLoading(true);
    setcurrentPage((prev) => prev - 1);
  };

  return (
    !loading && (
      <div className={`${styles.catalog}`}>
        <RecipesList recipes={currentRecipes} />
        <div className={`${styles.catalog_paginate}`}>
          <Button disabled={currentPage === 1} onClick={prevPage}>
            Prev page
          </Button>
          <div className={`${styles.catalog_paginate_numbering}`}>
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

export default CatalogPage;
