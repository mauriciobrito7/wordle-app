import { useState, useEffect, useRef } from 'react';

type Serializer<T> = (value: T) => string;
type Deserializer<T> = (value: string) => T;

interface UseLocalStorageStateOptions<T> {
  serialize?: Serializer<T>;
  deserialize?: Deserializer<T>;
}

function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseLocalStorageStateOptions<T> = {}
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch (e) {
        return typeof defaultValue === 'function'
          ? defaultValue()
          : defaultValue;
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [state, key, serialize]);

  return [state, setState];
}

export default useLocalStorageState;
