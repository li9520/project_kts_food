import { useEffect, useState } from "react";

import { API_KEY } from "@config/api";
import axios from "axios";
import { useParams } from "react-router-dom";

import RenderPage, { RenderPageProps } from "./components/RenderPage";

const RecipePage = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [card, setCards] = useState<RenderPageProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>"error!"</div>;

  return <RenderPage {...card} />;
};

export default RecipePage;
