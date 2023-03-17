import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Header } from './header';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Header', async () => {
  it('renders header links', async () => {
    const { findAllByRole } = render(<Header />, { wrapper: BrowserRouter });

    const links = await findAllByRole('link');

    expect(links).toHaveLength(2);
  });
});
