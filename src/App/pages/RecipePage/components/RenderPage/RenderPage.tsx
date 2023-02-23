import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";

import styles from "./RenderPage.module.scss";

export type RenderPageProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  readyInMinutes: string;
  instruction: any;
};

const RenderPage: React.FC<RenderPageProps> = ({
  image,
  title,
  readyInMinutes,
  instruction,
}) => {
  const navigate = useNavigate();
  const recipeImage = (
    <img className={`${styles.recipe_img}`} alt="" src={image} />
  );
  const recipeTitle = (
    <div className={`${styles.recipe_body_title}`}>{title}</div>
  );
  const recipeTimer = (
    <div
      className={`${styles.recipe_body_time}`}
    >{`${readyInMinutes} MINUTES`}</div>
  );

  const recipe_instraction = (
    <div
      className="recipe_body_instraction"
      id="terms-content"
      dangerouslySetInnerHTML={{ __html: instruction }}
    />
  );

  return (
    <div className={`${styles.recipe}`}>
      {recipeImage}
      <div className={`${styles.recipe_body}`}>
        <div className={`${styles.wrapper}`}>
          {recipeTitle}
          {recipeTimer}
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
