import { FC, ReactEventHandler } from 'react';
import { Product } from '../../models/product';
import { Grid } from '../grid/grid';
import { ProductCard } from '../product-card/product-card';

export type ProductListProps = {
  products: Product[];
  onCardClick: (id: number) => ReactEventHandler;
};

export const ProductList: FC<ProductListProps> = ({ products, onCardClick }) => {
  return (
    <>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onCardClick(product.id)} />
        ))}
      </Grid>
    </>
  );
};
