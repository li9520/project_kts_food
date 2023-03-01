import Card from "@components/Card";
import { useNavigate } from "react-router-dom";

import styles from "./RecipesList.module.scss";

export type RecipeProps = {
  id: number;
  image: string;
  title: React.ReactNode;
  nutrition: {
    ingredients: { name: string }[];
    nutrients: { name: string; amount: number }[];
  };
};

type RecipesListProps = {
  recipes: RecipeProps[];
};

const RecipesLits: React.FC<RecipesListProps> = ({ recipes }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.recipes}>
      {recipes.map((card: RecipeProps) => {
        const ingredientsList = card.nutrition.ingredients
          .splice(0, 4)
          .map((el) => el.name);
        const kcal = card.nutrition.nutrients.filter(
          (item) => item.name === "Calories"
        )[0].amount;
        return (
          <div className={styles.recipes_item} key={card.id}>
            <Card
              {...card}
              content={`${kcal} kcal`}
              subtitle={ingredientsList.join(" + ")}
              onClick={() => navigate(`/receipt/${card.id}`)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RecipesLits;
