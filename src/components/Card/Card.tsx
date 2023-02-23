import React from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  id: any;
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const CardImage = ({ image }: { image: string }) => {
  return <img className="card_img" src={image} alt="фото еды" />;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick && onClick(e);
  };

  const titleDom = <div className={`${styles.card_title}`}>{title}</div>;
  const subtitleDom = (
    <div className={`${styles.card_subtitle}`}>{subtitle}</div>
  );
  const contentDom = <div>{content}</div>;

  return (
    <div className={`${styles.card}`} onClick={handleClick}>
      <div className={`${styles.card_body}`}>
        <CardImage image={image} />
        {titleDom}
        {subtitleDom}
        {contentDom}
      </div>
    </div>
  );
};

export default Card;
