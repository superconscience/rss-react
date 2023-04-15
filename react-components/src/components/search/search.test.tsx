import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/utils';
import { Search } from './search';

describe('Search', async () => {
  it('gets value from the store on render', async () => {
    const searchValue = 'test';
    const { debug, getByRole } = await act(() =>
      waitFor(() =>
        renderWithProviders(<Search onSearch={vi.fn()} />, {
          preloadedState: { products: { search: searchValue } },
        })
      )
    );

    expect(getByRole('searchbox')).toHaveValue(searchValue);
    debug();
  });
});
