import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearch as setStoreSearch } from '../store/slices/product-slice';
import { AppDispatch } from '../store/store';

export const useSearch = (): [string, (value: string) => ReturnType<AppDispatch>] => {
  const search = useAppSelector((state) => state.products.search);
  const dispatch = useAppDispatch();
  const setSearch = (value: string) => dispatch(setStoreSearch(value));

  return [search, setSearch];
};
