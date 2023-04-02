import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import { getTypedStorageItem, setTypedStorageItem } from '../../utils/localstorage';
import { Search } from './search';

describe('Search', async () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('stores value to localStorage on unmount', async () => {
    const { getByPlaceholderText, unmount } = render(<Search />);
    const user = userEvent.setup();
    const testInputValue = 'test';

    const input = getByPlaceholderText(/search/i);

    expect(input instanceof HTMLInputElement).toEqual(true);
    await user.type(input, testInputValue);

    unmount();

    expect(getTypedStorageItem('search')).toEqual(testInputValue);
  });

  it('rendered getting value from localStorage', () => {
    const storedValue = 'test';
    setTypedStorageItem('search', storedValue);

    const { getByDisplayValue } = render(<Search />);

    expect(getByDisplayValue(new RegExp(storedValue, 'i'))).toBeInTheDocument();
  });
});
