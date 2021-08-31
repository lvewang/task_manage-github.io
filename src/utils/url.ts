import { useSearchParams } from "react-router-dom";

/**
 * return url params from designated params
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in K]: string }),
    setSearchParams,
  ] as const;
};
const a = ["jack", 12, { gender: "male" }] as const;
