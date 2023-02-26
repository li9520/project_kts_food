import Resource from "@app/components/Resource";
import { API_KEY } from "@config/api";
import { useParams } from "react-router-dom";

import RenderPage, { RenderPageProps } from "./components/RenderPage";

const RecipePage = () => {
  const { id } = useParams();
  const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`;

  const setData = (data: any) => {
    const ingredientsList: { image: string; amount: string; name: string }[] =
      data.extendedIngredients.map(
        (item: {
          id: any;
          image: string;
          amount: number;
          unit: string;
          name: string;
        }) => {
          return {
            id: id,
            image: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
            amount: `${item.amount} ${item.unit}`,
            name: `${item.name}`,
          };
        }
      );
    return {
      image: data.image,
      title: data.title,
      instruction: data.instructions,
      readyInMinutes: data.readyInMinutes,
      ingredients: ingredientsList,
      numServing: data.servings,
    };
  };

  return (
    <Resource
      url={url}
      setData={setData}
      render={(card: RenderPageProps) => <RenderPage {...card} />}
    ></Resource>
  );
};

export default RecipePage;
