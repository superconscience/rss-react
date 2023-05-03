import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { UserCard } from '../components/user-card/user-card';
import { fakeUser } from '../models/user';
import { getRandomId } from '../utils/functions';
import { AppContext, AppContextProvider } from './app-context';

describe('AppContextProvider', async () => {
  it('renders contents and changes state on actions', async () => {
    const { unmount, getByTestId, queryByTestId, queryAllByRole } = render(
      <AppContextProvider>
        <AppContext.Consumer>
          {({ users, addUser, usersAlert }) => (
            <>
              {usersAlert.isOpen && <div data-testid="alert" />}
              {users.map((user) => (
                <UserCard key={getRandomId()} user={user} />
              ))}
              <button data-testid="add-user" onClick={() => addUser(fakeUser)}></button>
              <button data-testid="open-alert" onClick={() => usersAlert.open()}></button>
              <button data-testid="close-alert" onClick={() => usersAlert.close()}></button>
            </>
          )}
        </AppContext.Consumer>
      </AppContextProvider>
    );

    const addUserBtn = getByTestId('add-user');
    const openAlert = getByTestId('open-alert');
    const closeAlert = getByTestId('close-alert');
    const queryAlert = () => queryByTestId('alert');

    await waitFor(() => fireEvent.click(addUserBtn));
    await waitFor(() => fireEvent.click(addUserBtn));
    await waitFor(() => fireEvent.click(addUserBtn));

    expect(queryAllByRole('heading', { level: 3 })).toHaveLength(3);

    expect(queryAlert()).not.toBeInTheDocument();

    await waitFor(() => fireEvent.click(openAlert));

    expect(queryAlert()).toBeInTheDocument();

    await waitFor(() => fireEvent.click(closeAlert));

    expect(queryAlert()).not.toBeInTheDocument();

    unmount();
  });
});
