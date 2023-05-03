import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Mock, describe, it, vi } from 'vitest';
import { createFakeProducts } from '../../models/product';
import { ProductList } from './product-list';

const renderProductList = (count: number, onCardClick: Mock) =>
  render(<ProductList products={createFakeProducts(count)} onCardClick={onCardClick} />);

describe('ProductList', async () => {
  it('renders products', async () => {
    const count = 10;
    const { unmount, container } = renderProductList(count, vi.fn());

    const listItems = container.querySelectorAll(`li[class*=product-preview]`);

    expect(listItems).toHaveLength(count);

    unmount();
  });
});
