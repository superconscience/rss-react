import { Component, PropsWithChildren, createContext } from 'react';
import { User } from '../models/user';

export type AppContextType = {
  users: User[];
  addUser: (user: User) => void;
};

const initialState: AppContextType = { users: [], addUser: () => {} };

export const AppContext = createContext<AppContextType>(initialState);

export class AppContextProvider extends Component<PropsWithChildren, { users: User[] }> {
  state: { users: User[] } = {
    users: [],
  };
  addUser = (user: User) => {
    this.setState((prev) => ({ ...prev, users: [...prev.users, user] }));
  };
  render() {
    return (
      <AppContext.Provider value={{ users: this.state.users, addUser: this.addUser }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
