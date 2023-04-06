import classNames from 'classnames';
import { FC } from 'react';
import { Product } from '../../models/product';
import { PropsWithClassName } from '../../types/types';
import styles from './product-details.module.scss';
import { formatPrice } from '../../utils/functions';

export type ProductDetailsProps = PropsWithClassName & {
  product: Product;
};

export type ProductDetailsState = {
  image: string | undefined;
};

export const ProductDetails: FC<ProductDetailsProps> = ({ product, className }) => {
  const { title, description, discountPercentage, rating, brand, category, price, stock, images } =
    product;

  return (
    <div className={classNames(styles['block-detail'], className)}>
      <div className={styles['product-title']}>
        <h1 className={styles['title-detail']}>{title}</h1>
      </div>
      <div className={styles['product-data']}>
        <div className={styles['product-photo']}>
          <div className={styles['grand-photo']}>
            <img className={styles['img-big']} alt="Slide" src={images[0]} />
          </div>
        </div>
        <div className={styles['product-info']}>
          <div className={styles['product-detail-item']}>
            <h3 className={styles['title-desc']}>Description:</h3>
            <p className={styles['detail-description']}>{description}</p>
          </div>
          <div className={styles['product-detail-item']}>
            <h3 className={styles['title-perc']}>Discount Percentage:</h3>
            <p className={styles['detail-discount']}>{discountPercentage}%</p>
          </div>
          <div className={styles['product-detail-item']}>
            <h3 className={styles['title-rating']}>Rating:</h3>
            <p className={styles['detail-rating']}>{rating}</p>
          </div>
          <div className={styles['product-detail-item']}>
            <h3 className={styles['title-stock']}>Stock:</h3>
            <p className={styles['detail-stock']}>{stock}</p>
          </div>
          <div className={styles['product-detail-item']}>
            <h3 className={styles['title-brand']}>Brand:</h3>
            <p className={styles['detail-brand']}>{brand}</p>
          </div>
          <div className={styles['product-detail-item']}>
            <h3 className={styles['title-category']}>Category:</h3>
            <p className={styles['detail-category']}>{category}</p>
          </div>
        </div>
        <div className={styles['add-to-cart-block']}>
          <div className={styles['add-to-cart-wrapper']}>
            <div className={styles['detail-price']}>{formatPrice(price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
