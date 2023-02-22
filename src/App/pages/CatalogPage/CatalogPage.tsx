import { useEffect, useState } from "react";

import Card, { CardProps } from "@components/Card";
import axios from "axios";
import "./CatalogPage.css";
import { useNavigate } from "react-router-dom";

const CatalogPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardProps[] | null>(null);
  const navigate = useNavigate();
  //{/*url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=2593c1f9f006463c98678507137c57e2`,*/}
  useEffect(() => {
    const getData = async () => {
      await axios({
        method: "get",
        url: "https://api.spoonacular.com/recipes/random?number=20&apiKey=2593c1f9f006463c98678507137c57e2",
      })
        .then((response) => {
          setCards(
            response.data.recipes.map(
              (item: { id: any; image: any; title: any }) => ({
                id: item.id,
                image: item.image,
                title: item.title,
              })
            )
          );
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          setError(error);
        })
        .finally(() => setLoading(false));
    };
    getData();
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;

  return (
    <div className="conteiner flex-row wrap">
      {cards &&
        cards.map((card) => (
          <Card
            title={card.title}
            key={card.id}
            subtitle=""
            image={card.image}
            id={card.id}
            onClick={() => navigate(`/receipt/${card.id}`)}
          />
        ))}
    </div>
  );
};

export default CatalogPage;
