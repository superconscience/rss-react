export type LocalStorageSchema = {
  search: string;
};

export const prefix = 'rss-react-components:';

export const createStorageKey = (key: keyof LocalStorageSchema) => `${prefix}${key}`;

export const setTypedStorageItem = <T extends keyof LocalStorageSchema>(
  key: T,
  value: LocalStorageSchema[T]
): void => {
  window.localStorage.setItem(createStorageKey(key), JSON.stringify(value));
};

export const getTypedStorageItem = <T extends keyof LocalStorageSchema>(
  key: T
): LocalStorageSchema[T] | null => {
  const item = window.localStorage.getItem(createStorageKey(key));
  return item ? (JSON.parse(item) as LocalStorageSchema[T]) : null;
};
