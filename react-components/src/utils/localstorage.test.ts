// import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import {
  LocalStorageSchema,
  getTypedStorageItem,
  setTypedStorageItem,
  createStorageKey,
  prefix as localStoragePrefix,
} from './localstorage';

describe('localstorage', () => {
  describe('createStorageKey', () => {
    it('must create correct storage key', () => {
      const key: keyof LocalStorageSchema = 'search';
      expect(createStorageKey(key)).toEqual(`${localStoragePrefix}${key}`);
    });
  });

  describe('setTypedStorageItem', () => {
    it('must store items to localStorage', () => {
      const key: keyof LocalStorageSchema = 'search';
      const value = 'test';

      setTypedStorageItem('search', value);

      expect(window.localStorage.getItem(createStorageKey(key))).toEqual(JSON.stringify(value));

      expect(window.localStorage.getItem(key)).not.toEqual(JSON.stringify(value));

      expect(window.localStorage.getItem('random')).toBeNull();

      expect(window.localStorage.getItem(key)).toBeNull();
    });
  });

  describe('getTypedStorageItem', () => {
    it('must get items from localStorage', () => {
      const key: keyof LocalStorageSchema = 'search';
      const value = 'test';

      window.localStorage.setItem(key, value);

      expect(getTypedStorageItem(key)).toEqual(value);
    });
  });
});
