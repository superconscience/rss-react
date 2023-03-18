import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import {
  LocalStorageSchema,
  getTypedStorageItem,
  setTypedStorageItem,
  createStorageKey,
  prefix as localStoragePrefix,
} from './localstorage';

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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

      expect(JSON.stringify(window.localStorage.getItem('random'))).toBeUndefined();

      expect(JSON.stringify(window.localStorage.getItem(key))).toBeUndefined();
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
