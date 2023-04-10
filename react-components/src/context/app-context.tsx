import { FC, PropsWithChildren, createContext, useState } from 'react';
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

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const addUser = (user: User): void => {
    setUsers((prev) => [...prev, user]);
  };
  const openUsersAlert = (): void => {
    setIsAlertOpen(true);
  };
  const closeUsersAlert = (): void => {
    setIsAlertOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        users: users,
        addUser: addUser,
        usersAlert: {
          isOpen: isAlertOpen,
          open: openUsersAlert,
          close: closeUsersAlert,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
