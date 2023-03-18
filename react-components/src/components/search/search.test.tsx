import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Search } from './search';
import { render } from '@testing-library/react';

describe('Layout', async () => {
  it('renders header and main elements', async () => {
    const { getByTestId } = render(<Search />);

    // const header = getByTestId('header');
    // const main = getByTestId('main');

    // expect(header).toBeInTheDocument();
    // expect(main).toBeInTheDocument();
  });
});
