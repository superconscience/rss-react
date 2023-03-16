import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Header } from './header';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Header', async () => {
  it('renders header links', async () => {
    const { findByText } = render(<Header />, { wrapper: BrowserRouter });

    const homeLink = await findByText(/home/i);
    const aboutLink = await findByText(/about us/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });
});
