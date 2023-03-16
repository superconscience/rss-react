import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Layout } from './layout';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Layout', async () => {
  it('renders layout', async () => {
    const { findByText } = render(<Layout />, { wrapper: BrowserRouter });

    const aboutLink = await findByText(/about us/i);
    const homeLink = await findByText(/home/i);

    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });
});
