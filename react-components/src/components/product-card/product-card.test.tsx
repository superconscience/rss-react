import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { fakeProduct } from '../../models/product';
import { formatPrice } from '../../utils/functions';
import { ProductCard } from './product-card';

describe('ProductCard', async () => {
  it('renders card data', async () => {
    const { getByText } = render(<ProductCard product={fakeProduct} />);

    const titleRegexp = new RegExp(fakeProduct.title, 'i');
    const priceRegexp = new RegExp(formatPrice(fakeProduct.price), 'i');

    const title = getByText(titleRegexp);
    const price = getByText(priceRegexp);

    [title, price].forEach((elem) => {
      expect(elem).toBeInTheDocument();
    });
  });
});
