import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { describe, it } from 'vitest';
import { serviceHandlers } from '../../__tests__/mock-dummy-json';
import { renderWithProviders } from '../../__tests__/utils';
import { BASE_URL, BaseResponse } from '../../api/dummy-json.api';
import { createFakeProducts, fakeProduct } from '../../models/product';
import { Home } from './home';

serviceHandlers([
  {
    endpoint: 'products/1',
    response: fakeProduct,
    method: 'get',
  },
  rest.get(`${BASE_URL}/products/search`, (req, res, ctx) => {
    const search = req.url.searchParams.get('q');
    const response: BaseResponse = {
      limit: 10,
      products: createFakeProducts(10),
      skip: 0,
      total: 100,
    };
    if (search === 'iphone') {
      response.products = [fakeProduct];
    } else if (search !== '') {
      response.products = [];
    }
    return res(ctx.status(200), ctx.json(response));
  }),
]);

describe('Home', () => {
  it('renders search input and cards', async () => {
    const { unmount, container, getByPlaceholderText, getByTestId, findByPlaceholderText } =
      await waitFor(() =>
        renderWithProviders(<Home />, { preloadedState: { products: { search: '' } } })
      );

    const getListItems = () => container.querySelectorAll(`li[class*=product-preview]`);

    expect(getByPlaceholderText(/search/i)).toBeInTheDocument();

    expect(getListItems()).toHaveLength(10);

    await waitFor(() => fireEvent.click(getListItems()[0]));

    const modal = getByTestId('modal');

    expect(modal).toBeInTheDocument();

    const title = modal.querySelector('h1');

    if (title) {
      expect(title).toHaveTextContent(fakeProduct.title);
    }

    const searchInput = await findByPlaceholderText(/search/i);
    await waitFor(() => fireEvent.change(searchInput, { target: { value: 'iphone' } }));
    await waitFor(() => fireEvent.keyUp(searchInput, { key: 'Enter', code: 13, charCode: 13 }));

    expect(getListItems()).toHaveLength(1);

    unmount();
  });
});
