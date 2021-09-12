import { useEffect } from "react";
import { Project } from "screens/ProjectListScreen/List";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...rest } = useAsync<Project[]>();

  const client = useHttp();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return rest;
};
