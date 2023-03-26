import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { UsersAlert } from './users-alert';

const onClose = vi.fn();
const component = <UsersAlert onClose={onClose} />;

describe('UsersAlert', async () => {
  it('renders contents', async () => {
    const { unmount, getByText } = render(component);

    expect(getByText(/user has been added/i)).toBeInTheDocument();

    unmount();
  });

  it('calls onClose on close button click', async () => {
    const { unmount, getByRole } = render(component);
    await waitFor(() => fireEvent.click(getByRole('button')));
    expect(onClose).toBeCalledTimes(1);

    unmount();
  });
});
