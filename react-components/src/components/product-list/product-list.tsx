import { FC, ReactEventHandler } from 'react';
import { Product } from '../../models/product';
import { Grid } from '../grid/grid';
import { ProductCard } from '../product-card/product-card';

export type ProductListProps = {
  products: Product[] | null;
  error: string | null;
  onCardClick: (id: number) => ReactEventHandler;
  renderSpinner: (() => JSX.Element) | (() => null);
};

export const ProductList: FC<ProductListProps> = ({
  products,
  error,
  onCardClick,
  renderSpinner,
}) => {
  const hasData = products && products.length > 0;
  return (
    <>
      {hasData && (
        <Grid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={onCardClick(product.id)} />
          ))}
        </Grid>
      )}
      {!hasData && <p>Sorry, no items found 😩</p>}
      {renderSpinner()}
      {error && (
        <div className="alert alert-danger">
          <span>
            <strong>Error!</strong> {error}
          </span>
        </div>
      )}
    </>
  );
};
