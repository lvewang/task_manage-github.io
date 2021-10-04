import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  //iterator
  //https://codesandbox.io/s/stoic-golick-82hgp?file=/src/index.js
  const setParam = (param: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...param,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
  return [a, setParam] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
  };

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
