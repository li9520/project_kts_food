import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import RenderPage, { RenderPageProps } from "./components/RenderPage";

const RecipePage = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [card, setCards] = useState<RenderPageProps | null>(null);

  useEffect(() => {
    const getData = async () => {
      await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=2593c1f9f006463c98678507137c57e2`,
      })
        .then((response) => {
          setCards({
            image: response.data.image,
            title: response.data.title,
            instruction: response.data.instructions,
            readyInMinutes: response.data.readyInMinutes,
          });
        })
        .catch((error) => setError(error));
    };
    getData();
  }, []);

  if (error) return <div>"error!"</div>;

  return <RenderPage {...card} />;
};

export default RecipePage;
