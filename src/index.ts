import {useCallback} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StorageType = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnChangedHandler = (key: string, value: any) => void;

export type MemoryStorageOptions = {
  storage: StorageType;
  onChanged?: OnChangedHandler;
}

const getStoreValue = <T>(key: string, localStorage: StorageType | undefined, initialValue: T): T => {
  if (localStorage && key in localStorage) {
    return localStorage[key];
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
};

const useLocalStorage = <T>(key: string, initialValue: T, options?: MemoryStorageOptions): [T, (value: T) => void] => {
  const storedValue = getStoreValue(key, options?.storage, initialValue);
  const setValue    = useCallback((value: T): void | never => {
    options?.onChanged?.(key, value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [storedValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;
