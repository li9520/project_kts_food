import Resource from "@app/components/Resource";
import { URLmap, API_KEY } from "@config/api";
import { useParams } from "react-router-dom";

import RenderPage from "./components/RenderPage";

const RecipePage = () => {
  const { id } = useParams();

  if (!id) return <div>Not found</div>;

  const getUrl = URLmap.recipe;
  const url = getUrl(id, {
    apiKey: API_KEY,
    includeNutrition: true,
  });
  /*
  const setData = (data: {
    title: ReactNode;
    image: string;
    instructions: any;
    readyInMinutes: number;
    servings: number;
    extendedIngredients: {
      id: number;
      image: string;
      amount: number;
      unit: string;
      name: string;
    }[];
  }) => {
    const ingredientsList = data.extendedIngredients.map((item) => {
      const getPathImg = URLmap.ingredientImg;
      return {
        id: id,
        image: getPathImg(item.image),
        amount: `${item.amount} ${item.unit}`,
        name: `${item.name}`,
      };
    });
    return {
      image: data.image,
      title: data.title,
      instruction: data.instructions,
      readyInMinutes: data.readyInMinutes,
      ingredients: ingredientsList,
      numServing: data.servings,
    };
  };
*/
  return (
    <Resource url={url} render={(card) => <RenderPage {...card} />}></Resource>
  );
};

export default RecipePage;
