import cn from 'classnames';
import {
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BaseResponse } from '../../api/dummy-json.api';
import { ProductService } from '../../services/product.service';
import { PropsWithClassName } from '../../types/types';
import { getTypedStorageItem, setTypedStorageItem } from '../../utils/localstorage';
import styles from './search.module.scss';

export type SearchState = {
  search: string;
};

export type SearchProps = PropsWithClassName &
  InputHTMLAttributes<HTMLInputElement> & { run: (promise: Promise<BaseResponse>) => void };

export const Search: FC<SearchProps> = ({ className, run, ...props }) => {
  const [search, setSearch] = useState<SearchState['search']>(getTypedStorageItem('search') || '');

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);

  const setInputValueToLocalstorage = useCallback(() => {
    if (search !== undefined) {
      setTypedStorageItem('search', search);
    }
  }, [search]);

  const inputEnterKeyupHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      run(ProductService.search(search));
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', setInputValueToLocalstorage);
    return () => {
      window.removeEventListener('beforeunload', setInputValueToLocalstorage);
      setInputValueToLocalstorage();
    };
  }, [setInputValueToLocalstorage]);

  return (
    <input
      className={cn(className, styles.search)}
      type="search"
      placeholder="Search"
      {...props}
      value={search}
      onChange={inputChangeHandler}
      onKeyUp={inputEnterKeyupHandler}
    />
  );
};
