import { Component, PropsWithChildren, createContext } from 'react';
import { User } from '../../models/user';

export type UsersContextType = {
  users: User[];
  addUser: (user: User) => void;
};

const initialState: UsersContextType = { users: [], addUser: () => {} };

export const UsersContext = createContext<UsersContextType>(initialState);

export class UsersContextProvider extends Component<PropsWithChildren, { users: User[] }> {
  state: { users: User[] } = {
    users: [],
  };
  addUser = (user: User) => {
    this.setState((prev) => ({ ...prev, users: [...prev.users, user] }));
  };
  render() {
    return (
      <UsersContext.Provider value={{ users: this.state.users, addUser: this.addUser }}>
        {this.props.children}
      </UsersContext.Provider>
    );
  }
}
