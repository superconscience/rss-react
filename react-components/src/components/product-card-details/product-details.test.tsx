import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { fakeProduct } from '../../models/product';
import { formatPrice } from '../../utils/functions';
import { ProductDetails } from './product-details';

describe('ProductDetails', async () => {
  it('renders card data', async () => {
    const { getByText, getByRole } = render(<ProductDetails product={fakeProduct} />);

    const titleRegexp = new RegExp(fakeProduct.title, 'i');
    const categoryRegexp = new RegExp(fakeProduct.title, 'i');
    const brandRegexp = new RegExp(fakeProduct.title, 'i');
    const priceRegexp = new RegExp(formatPrice(fakeProduct.price), 'i');

    const title = getByText(titleRegexp);
    const category = getByText(categoryRegexp);
    const brand = getByText(brandRegexp);
    const price = getByText(priceRegexp);
    const image = getByRole('img');

    [title, category, brand, price, image].forEach((elem) => {
      expect(elem).toBeInTheDocument();
    });
  });
});
