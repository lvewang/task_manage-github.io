import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (func) => {
  useEffect(() => func(), []);
};

export const useDebounce = (term, delay) => {
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
