import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * return url params from designated params
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  //iterator
  //https://codesandbox.io/s/stoic-golick-82hgp?file=/src/index.js
  return [
    useMemo(() => {
      return stateKeys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      }, {} as { [key in K]: string });
    }, [searchParams, stateKeys]),
    (param: Partial<{ [key in K]: unknown }>) => setSearchParams(param),
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (param: Partial<{ [key in string]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...param,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
