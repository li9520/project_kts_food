import Card from "@components/Card";
import { useNavigate } from "react-router-dom";

import styles from "./RecipesList.module.scss";

export type RecipeProps = {
  id: any;
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
};

type RecipesListProps = {
  recipes: RecipeProps[];
};

const RecipesLits: React.FC<RecipesListProps> = ({ recipes }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.recipes}`}>
      {recipes.map((card: RecipeProps) => (
        <div className={`${styles.recipes_item}`} key={card.id}>
          <Card
            title={card.title}
            subtitle=""
            image={card.image}
            id={card.id}
            onClick={() => navigate(`/receipt/${card.id}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipesLits;
