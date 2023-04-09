import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { getTypedStorageItem, setTypedStorageItem } from '../../utils/localstorage';
import { Search } from './search';

describe('Search', async () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('stores value to localStorage on unmount', async () => {
    const onSearch = vi.fn();
    const { getByPlaceholderText, unmount } = render(<Search onSearch={onSearch} />);
    const user = userEvent.setup();
    const testInputValue = 'test';

    const input = getByPlaceholderText(/search/i);

    expect(input instanceof HTMLInputElement).toEqual(true);
    await user.type(input, testInputValue);

    unmount();

    expect(getTypedStorageItem('search')).toEqual(testInputValue);
  });

  it('rendered getting value from localStorage', () => {
    const onSearch = vi.fn();
    const storedValue = 'test';
    setTypedStorageItem('search', storedValue);

    const { getByDisplayValue } = render(<Search onSearch={onSearch} />);

    expect(getByDisplayValue(new RegExp(storedValue, 'i'))).toBeInTheDocument();
  });
});
