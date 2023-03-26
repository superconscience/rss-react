import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Layout } from './layout';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Layout', async () => {
  it('renders header and main elements', async () => {
    const { getByTestId } = render(<Layout />, { wrapper: BrowserRouter });

    const header = getByTestId('header');
    const main = getByTestId('main');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
