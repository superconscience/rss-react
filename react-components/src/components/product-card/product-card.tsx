import classNames from 'classnames';
import { CSSProperties, FC, HTMLAttributes } from 'react';
import { useImage } from '../../hooks/use-image';
import { Product } from '../../models/product';
import { PropsWithClassName } from '../../types/types';
import { formatPrice } from '../../utils/functions';
import styles from './product-card.module.scss';
import imageNotAvailable from '/image-not-available.jpg';

export type ProductCardProps = PropsWithClassName & {
  product: Product;
} & Pick<HTMLAttributes<HTMLLIElement>, 'onClick'>;

export type ProductCardState = {
  image: string | undefined;
};

export const ProductCard: FC<ProductCardProps> = ({ product, className, onClick }) => {
  const { title, price, thumbnail, stock } = product;
  const loadedSrc = useImage(thumbnail, imageNotAvailable);
  const isImageLoaded = loadedSrc === thumbnail;

  const thumbnailStyle: CSSProperties = isImageLoaded
    ? { background: `url(${loadedSrc}) 0% 0% / cover` }
    : { backgroundImage: `url(${loadedSrc})`, backgroundSize: '100% 100%' };

  const isAvailable = stock > 0;

  return (
    <li
      className={classNames(styles['product-preview'], className)}
      onClick={onClick}
      data-testid="product-card"
    >
      <div className={styles['product-item']}>
        <div className={styles['product-item__wrapper']} style={thumbnailStyle}>
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
