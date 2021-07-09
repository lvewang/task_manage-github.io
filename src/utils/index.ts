import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (func: () => void) => {
  useEffect(() => func(), []);
};

export const useDebounce = (term: any, delay?: number) => {
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedTerm(term), delay);
    return () => clearTimeout(timeout);
  }, [term, delay]);

  return debouncedTerm;
};

// var debounce = (func, delay = 1000) => {
//   let timeout;
//   return () => {
//     debugger;
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func();
//     }, delay);
//   };
// };

// var log = debounce(() => {
//   console.log("aa");
// });
// log();
// log();
// log();
export const useArray = <V>(persons: V[]) => {
  const [value, setValue] = useState(persons);
  const clear = () => setValue([]);
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };
  const add = (obj: V) => {
    setValue([...value, obj]);
  };
  return { value, clear, removeIndex, add };
};
