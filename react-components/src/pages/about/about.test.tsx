import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { About } from './about';
import { render } from '@testing-library/react';

describe('About', async () => {
  it('renders page contents', async () => {
    const { getAllByText } = render(<About />);
    expect(getAllByText(/lorem ipsum/i)).toHaveLength(3);
  });
});
