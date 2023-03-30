import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card as CardType } from '../../data/cards';
import { PropsWithClassName } from '../../types/types';
import { humanizeNumber } from '../../utils/functions';
import { LikeIcon } from '../ui/like-icon';
import { ViewsIcon } from '../ui/views-icon';
import styles from './card.module.scss';

export type CardProps = PropsWithClassName & { card: CardType };

export type CardState = {
  image: string | undefined;
};

export const Card: FC<CardProps> = ({ card, className }) => {
  const { title, author, tags, link, likes, views, image: cardImage } = card;

  const [image, setImage] = useState<CardState['image']>();

  const loadImage = async (filename: string) => {
    const sep = '.';
    const [ext, ...nameParts] = filename.split(sep).reverse();
    const name = nameParts.join(sep);
    const image = await import(`../../assets/images/${name}.${ext}`);
    setImage(image.default);
  };

  useEffect(() => {
    if (cardImage) {
      loadImage(cardImage);
    }
  }, [cardImage]);

  return (
    <li className={cn(className, styles.card)}>
      <img className={styles.card__image} src={image} alt={title} />
      <div className={styles.card__middle}>
        <div className={styles.card__description}>
          <Link to="/" className={styles.card__title}>
            {title}
          </Link>
          <div className={styles.card__author}>
            by&nbsp;
            <Link to={link} className={styles['card__author-link']}>
              {author}
            </Link>
          </div>
        </div>
        <hr className={styles.card__separator} />
        <div>
          <span className={styles.card__tags}>{tags}</span>
        </div>
      </div>
      <div className={styles.card__bottom}>
        <div>
          <LikeIcon fill="#989898" /> {humanizeNumber(likes)}
        </div>
        <div>
          <ViewsIcon fill="#989898" /> {humanizeNumber(views)}
        </div>
      </div>
    </li>
  );
};
