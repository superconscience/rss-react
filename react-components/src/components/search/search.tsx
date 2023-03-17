import { ChangeEvent, Component, InputHTMLAttributes } from 'react';
import { PropsWithClassName } from '../../types/types';
import cn from 'classnames';
import styles from './search.module.scss';
import { getTypedStorageItem, setTypedStorageItem } from '../../utils/localstorage';

export type SearchState = {
  search?: string;
};

export type SearchProps = PropsWithClassName & InputHTMLAttributes<HTMLInputElement>;

export class Search extends Component<
  PropsWithClassName & InputHTMLAttributes<HTMLInputElement>,
  SearchState
> {
  state: SearchState = {
    search: '',
  };

  constructor(props: SearchProps) {
    super(props);
    const search = getTypedStorageItem('search');
    if (search) {
      this.state.search = search;
    }
    this.bindEvents();
  }

  componentWillUnmount() {
    this.setInputValueToLocalstorage();
  }

  inputHandler = (event: ChangeEvent<HTMLInputElement>): void =>
    this.setState(() => ({
      search: event.target.value,
    }));

  bindEvents = (): void => {
    window.removeEventListener('beforeunload', Search.onWindowBeforeUnload);
    window.addEventListener(
      'beforeunload',
      (Search.onWindowBeforeUnload = () => {
        this.setInputValueToLocalstorage();
      })
    );
  };

  setInputValueToLocalstorage = () => {
    if (this.state.search !== undefined) {
      setTypedStorageItem('search', this.state.search);
    }
  };

  static onWindowBeforeUnload = (): void => {};

  render() {
    return (
      <input
        className={cn(this.props.className, styles.search)}
        type="search"
        placeholder="Search"
        {...this.props}
        value={this.state.search}
        onChange={this.inputHandler}
      />
    );
  }
}
