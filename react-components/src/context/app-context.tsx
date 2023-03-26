import { Component, PropsWithChildren, createContext } from 'react';
import { User } from '../models/user';

export type AppContextType = {
  users: User[];
  addUser: (user: User) => void;
  usersAlert: {
    isOpen: boolean;
    close: () => void;
    open: () => void;
  };
};

export type AppContextState = {
  users: User[];
  usersAlert: { isOpen: boolean };
};

const initialState: AppContextType = {
  users: [],
  addUser: () => {},
  usersAlert: { isOpen: false, open: () => {}, close: () => {} },
};

export const AppContext = createContext<AppContextType>(initialState);

export class AppContextProvider extends Component<PropsWithChildren, AppContextState> {
  state: AppContextState = {
    users: [],
    usersAlert: {
      isOpen: false,
    },
  };
  addUser = (user: User): void => {
    this.setState((prev) => ({ ...prev, users: [...prev.users, user] }));
  };
  openUsersAlert = (): void => {
    this.setState({ usersAlert: { isOpen: true } });
  };
  closeUsersAlert = (): void => {
    this.setState({ usersAlert: { isOpen: false } });
  };
  render() {
    return (
      <AppContext.Provider
        value={{
          users: this.state.users,
          addUser: this.addUser,
          usersAlert: {
            isOpen: this.state.usersAlert.isOpen,
            open: this.openUsersAlert,
            close: this.closeUsersAlert,
          },
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
