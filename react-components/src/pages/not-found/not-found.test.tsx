import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { NotFound } from './not-found';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound', async () => {
  it('renders page contents', async () => {
    const { getByText } = render(<NotFound />, { wrapper: BrowserRouter });

    expect(getByText(/page not found/i)).toBeInTheDocument();
  });
});
