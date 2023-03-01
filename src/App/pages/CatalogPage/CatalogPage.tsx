import Resource from "@app/components/Resource";
import { API_KEY, URLmap } from "@config/api";
import { CATALOG } from "@config/catalog";

import Paginate from "./components/Paginate";

const numberRecipes = 100;

const CatalogPage = () => {
  const getUrl = URLmap.list;
  const url = getUrl({
    apiKey: API_KEY,
    number: numberRecipes,
    addRecipeNutrition: true,
  });

  return (
    <Resource url={url} render={(data) => <Paginate {...data} />}></Resource>
    //<Paginate recipes={CATALOG} />
  );
};

export default CatalogPage;
