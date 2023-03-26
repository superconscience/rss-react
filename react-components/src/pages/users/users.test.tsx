import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Users } from './users';

describe('Users', async () => {
  it('renders contents', async () => {
    const { getByText } = render(<Users />);

    expect(getByText(/no users registered yet/i)).toBeInTheDocument();
  });
});
