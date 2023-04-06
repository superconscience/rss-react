import { FC, HTMLAttributes } from 'react';
import { Product } from '../../models/product';
import { PropsWithClassName } from '../../types/types';
import { formatPrice } from '../../utils/functions';
import classNames from 'classnames';
import styles from './product-card.module.scss';

export type ProductCardProps = PropsWithClassName & {
  card: Product;
} & Pick<HTMLAttributes<HTMLLIElement>, 'onClick'>;

export type ProductCardState = {
  image: string | undefined;
};

export const ProductCard: FC<ProductCardProps> = ({ card, className, onClick }) => {
  const { title, price, thumbnail, stock } = card;

  const isAvailable = stock > 0;

  return (
    <li className={classNames(styles['product-preview'], className)} onClick={onClick}>
      <div className={styles['product-item']}>
        <div
          className={styles['product-item__wrapper']}
          style={{ background: `url(${thumbnail}) 0% 0% / cover` }}
        >
          <div className={styles['product-item__text']}>
            <h4 className={styles['product-item__title']}>{title}</h4>
            <div className={styles['product-item__info']}>
              <ul className={styles['product-item__info-list']}>
                <li className={classNames(styles['product-item__info-list-item'], styles['price'])}>
                  {formatPrice(price)}
                </li>
                <li className={styles['product-item__info-list-item']}>
                  {isAvailable ? 'Available' : 'Out of stock'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
