import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import "./RecipePage.css";

const RecipePage = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [card, setCards] = useState<null | any>(null);

  useEffect(() => {
    const getData = async () => {
      await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=2593c1f9f006463c98678507137c57e2`,
      })
        .then((response) => {
          setCards({
            image: response.data.image,
            title: response.data.creditsText,
            instruction: response.data.instructions,
            readyInMinutes: response.data.readyInMinutes,
          });
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    getData();
  }, [id]);

  if (loading) return <div>"loading..."</div>;
  if (error) return <div>"error!"</div>;

  return (
    <div className="conteiner">
      <img className="" src={card.image} alt="фото еды" />
      <div>{card.title}</div>
      <div>{card.readyInMinutes}</div>
      <div>{card.instruction}</div>
    </div>
  );
};

export default RecipePage;
