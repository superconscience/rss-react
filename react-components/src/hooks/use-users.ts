import { User } from '../models/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUsers as setStoreUsers } from '../store/slices/user-slice';
import { AppDispatch } from '../store/store';

export const useUsers = (): [User[], (users: User[]) => ReturnType<AppDispatch>] => {
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const setSearch = (users: User[]) => dispatch(setStoreUsers(users));

  return [users, setSearch];
};
