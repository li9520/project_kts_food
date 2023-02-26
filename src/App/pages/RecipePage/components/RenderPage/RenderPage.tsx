import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";

import serving_img from "./img/servings.png";
import timer_img from "./img/timer.png";
import styles from "./RenderPage.module.scss";

type ingredientProp = {
  id: any;
  image: string;
  amount: string;
  name: string;
};

const CardIngredient: React.FC<ingredientProp> = ({
  image,
  amount,
  name,
  id,
}) => {
  return (
    <div key={id} className={`${styles.card_ingredient}`}>
      <p>{amount}</p>
      <img className={`${styles.card_ingredient_img}`} src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export type RenderPageProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  readyInMinutes: string;
  instruction: any;
  ingredients: ingredientProp[];
  numServing: number;
};

const RenderPage: React.FC<RenderPageProps> = ({
  image,
  title,
  readyInMinutes,
  instruction,
  ingredients,
  numServing,
}) => {
  const navigate = useNavigate();

  const recipeImage = (
    <img className={`${styles.recipe_img}`} alt="" src={image} />
  );
  const recipeTitle = (
    <h1 className={`${styles.recipe_body_title}`}>{title}</h1>
  );
  const recipeInfo = (
    <div className={`${styles.recipe_body_info}`}>
      <div className={`${styles.recipe_body_info_item}`}>
        <img src={timer_img} alt="timer" />
        <div>{`${readyInMinutes} MINUTES`}</div>
      </div>
      <div className={`${styles.recipe_body_info_item}`}>
        <img src={serving_img} alt="serving" />
        <div>{`${numServing} ${
          numServing === 1 ? "SERVING" : "SERVINGS"
        }`}</div>
      </div>
    </div>
  );

  const recipe_ingredients = (
    <>
      <h2>Ingredients</h2>
      <div className={`${styles.recipe_body_ingredients}`}>
        {ingredients.map((item) => (
          <CardIngredient {...item} />
        ))}
      </div>
    </>
  );

  const recipe_instraction = (
    <>
      <h2>Instruction</h2>
      <div
        className={`${styles.recipe_body_instraction}`}
        id="terms-content"
        dangerouslySetInnerHTML={{ __html: instruction }}
      />
    </>
  );

  return (
    <div className={`${styles.recipe}`}>
      {recipeImage}
      <div className={`${styles.recipe_body}`}>
        <div className={`${styles.wrapper}`}>
          {recipeTitle}
          {recipeInfo}
          {recipe_ingredients}
          {recipe_instraction}
        </div>
      </div>
      <Button
        onClick={() => navigate(`/`)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        Home
      </Button>
    </div>
  );
};

export default RenderPage;
