import Resource from "@app/components/Resource";
import { API_KEY } from "@config/api";
import { useParams } from "react-router-dom";

import RenderPage, { RenderPageProps } from "./components/RenderPage";

const RecipePage = () => {
  const { id } = useParams();
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

  const setData = (data: any) => {
    return {
      image: data.image,
      title: data.title,
      instruction: data.instructions,
      readyInMinutes: data.readyInMinutes,
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
