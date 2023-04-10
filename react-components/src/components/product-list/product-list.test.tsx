import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Mock, describe, it, vi } from 'vitest';
import { createFakeProducts } from '../../models/product';
import { ProductList } from './product-list';

const renderProductList = (count: number, onCardClick: Mock, renderSpinner: Mock) =>
  render(
    <ProductList
      products={createFakeProducts(count)}
      status="resolved"
      error={null}
      onCardClick={onCardClick}
      renderSpinner={renderSpinner}
    />
  );

const renderProductListWithError = (error: string, onCardClick: Mock, renderSpinner: Mock) =>
  render(
    <ProductList
      products={null}
      status="rejected"
      error={error}
      onCardClick={onCardClick}
      renderSpinner={renderSpinner}
    />
  );

describe('ProductList', async () => {
  it('renders products', async () => {
    const count = 10;
    const { unmount, container } = renderProductList(count, vi.fn(), vi.fn());

    const listItems = container.querySelectorAll(`li[class*=product-preview]`);

    expect(listItems).toHaveLength(count);

    unmount();
  });

  it('renders error', () => {
    const error = 'Error';
    const { unmount, getByText } = renderProductListWithError(error, vi.fn(), vi.fn());

    expect(getByText(error)).toBeInTheDocument();

    unmount();
  });
});
