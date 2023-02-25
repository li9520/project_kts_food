import Resource from "@app/components/Resource";
import { API_KEY } from "@config/api";
//import { CATALOG } from "@config/catalog";

import Paginate, { PaginateProps } from "./components/Paginate";

const CatalogPage = () => {
  const numberRecipes = 100;
  const url = `https://api.spoonacular.com/recipes/complexSearch?number=${numberRecipes}&addRecipeNutrition=true&apiKey=${API_KEY}`;
  const setData = (data: any) => {
    return data.results.map((item: any) => {
      const ingredients = item.nutrition.ingredients
        .splice(0, 4)
        .map((el: { name: string }) => el.name);
      const kcal = item.nutrition.nutrients.filter(
        (item: any) => item.name === "Calories"
      )[0].amount;
      return {
        id: item.id,
        image: item.image,
        title: item.title,
        ingredients: ingredients,
        kcal: kcal,
      };
    });
  };

  return (
    <Resource
      url={url}
      render={(recipes: PaginateProps) => <Paginate recipes={recipes} />}
      setData={setData}
    ></Resource>
  );
};

export default CatalogPage;
