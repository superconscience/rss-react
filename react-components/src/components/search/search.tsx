import cn from 'classnames';
import { ChangeEvent, FC, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { PropsWithClassName } from '../../types/types';
import { getTypedStorageItem, setTypedStorageItem } from '../../utils/localstorage';
import styles from './search.module.scss';

export type SearchState = {
  search: string;
};

export type SearchProps = PropsWithClassName & InputHTMLAttributes<HTMLInputElement>;

export const Search: FC<SearchProps> = ({ className, ...props }) => {
  const [search, setSearch] = useState<SearchState['search']>(getTypedStorageItem('search') || '');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>): void =>
    setSearch(event.target.value);

  const setInputValueToLocalstorage = useCallback(() => {
    if (search !== undefined) {
      setTypedStorageItem('search', search);
    }
  }, [search]);

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
      onChange={inputHandler}
    />
  );
};
