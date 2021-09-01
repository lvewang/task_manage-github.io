import styled from "@emotion/styled";
import { Typography } from "antd";
import { useMemo, useState } from "react";
import { useDebounce } from "utils";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useDocumentTitle } from "utils/useDocumentTitle";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};
