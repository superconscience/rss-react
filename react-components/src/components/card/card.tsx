import { Component } from 'react';
import { Card as CardType } from '../../data/cards';
import { PropsWithClassName } from '../../types/types';
import cn from 'classnames';
import styles from './card.module.scss';
import { Link } from 'react-router-dom';
import { humanizeNumber } from '../../utils/functions';
import { LikeIcon } from '../ui/like-icon';
import { ViewsIcon } from '../ui/views-icon';

export type CardProps = PropsWithClassName & { card: CardType };

export type CardState = {
  image: string | undefined;
};

export class Card extends Component<CardProps, CardState> {
  state: CardState = {
    image: undefined,
  };

  componentDidMount(): void {
    this.loadImage(this.props.card.image);
  }

  loadImage = async (filename: string) => {
    const [ext, ...nameParts] = filename.split('.').reverse();
    const name = nameParts.join('.');
    const image = await import(`../../assets/images/${name}.${ext}`);
    this.setState({
      image: image.default,
    });
  };

  render() {
    const { title, author, tags, link, likes, views } = this.props.card;
    const { image } = this.state;
    return (
      <li className={cn(this.props.className, styles.card)}>
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
  }
}
