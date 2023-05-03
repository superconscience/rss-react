import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../__tests__/utils';
import { fakeUser } from '../../models/user';
import { Users } from './users';

describe('Users', async () => {
  it('renders contents', async () => {
    const { unmount, getByText } = await act(() =>
      waitFor(() =>
        renderWithProviders(<Users />, {
          preloadedState: { users: { users: [fakeUser] } },
        })
      )
    );
    expect(getByText(fakeUser.email)).toBeInTheDocument();

    unmount();
  });
});
