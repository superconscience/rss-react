import cn from 'classnames';
import { ChangeEventHandler, FC, InputHTMLAttributes, KeyboardEventHandler, useState } from 'react';
import { useSearch } from '../../hooks/use-search';
import { PropsWithClassName } from '../../types/types';
import styles from './search.module.scss';

export type SearchState = {
  search: string;
};

export type SearchProps = PropsWithClassName &
  InputHTMLAttributes<HTMLInputElement> & {
    onSearch: (search: string) => void;
  };

export const Search: FC<SearchProps> = ({ className, onSearch, ...props }) => {
  const [storeSearch] = useSearch();
  const [search, setSearch] = useState(storeSearch);

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);

  const inputEnterKeyupHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onSearch(search || '');
    }
  };

  return (
    <input
      className={cn(className, styles.search)}
      type="search"
      placeholder="Search"
      {...props}
      value={search || ''}
      onChange={inputChangeHandler}
      onKeyUp={inputEnterKeyupHandler}
    />
  );
};
