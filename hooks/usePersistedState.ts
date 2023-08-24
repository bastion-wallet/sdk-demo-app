import { useCallback, useState } from "react";

interface UsePersistProps<T> {
  stateName: string;
  initialValue: T;
}

const usePersistedState = <T>({
  stateName,
  initialValue,
}: UsePersistProps<T>): [T, (value: T) => void] => {
  const name = `persist/${stateName}`;

  const getFromStorage = <T>(name: string, defaultValue?: T) => {
    try {
      const val = JSON.parse(localStorage.getItem(name) + "");
      if (val !== null) {
        return val;
      } else {
        localStorage.setItem(name, JSON.stringify(defaultValue));
      }
    } catch {
      return defaultValue;
    }
  };

  const [state, setState] = useState<T>(getFromStorage<T>(name, initialValue));

  const setValue = useCallback(
    (value: T) => {
      localStorage.setItem(name, JSON.stringify(value));
      setState(value);
      console.log(name, value);
    },
    [name]
  );

  return [state, setValue];
};

export default usePersistedState;
