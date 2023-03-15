export type LocalStorageSchema = {
  search: string;
};

const prefix = 'rss-react-components:';

export const setTypedStorageItem = <T extends keyof LocalStorageSchema>(
  key: T,
  value: LocalStorageSchema[T]
): void => {
  window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
};

export const getTypedStorageItem = <T extends keyof LocalStorageSchema>(
  key: T
): LocalStorageSchema[T] | null => {
  const item = window.localStorage.getItem(`${prefix}${key}`);
  return item ? (JSON.parse(item) as LocalStorageSchema[T]) : null;
};
