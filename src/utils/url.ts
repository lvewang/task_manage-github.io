import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * return url params from designated params
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const a = useMemo(() => {
    return keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in K]: string });
  }, [searchParams]);
  //iterator
  //https://codesandbox.io/s/stoic-golick-82hgp?file=/src/index.js
  const setParam = (param: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject({ ...Object.fromEntries(searchParams), ...param });
    return setSearchParams(o);
  };
  return [a, setParam] as const;
};
