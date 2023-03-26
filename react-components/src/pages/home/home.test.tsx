import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Home } from './home';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Home', async () => {
  it('renders search input and cards', async () => {
    const { getAllByRole, getByPlaceholderText } = render(<Home />, {
      wrapper: BrowserRouter,
    });

    expect(getByPlaceholderText(/search/i)).toBeInTheDocument();

    expect(getAllByRole('listitem')).toHaveLength(15);
  });
});
