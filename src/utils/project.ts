import { useEffect } from "react";
import { Project } from "screens/ProjectListScreen/List";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...rest } = useAsync<Project[]>();

  const client = useHttp();
  const fetchProjects = () =>
    client("projects", { data: cleanObject(param || {}) });
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return rest;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//   console.log("🚀 ~ file: project.ts ~ line 23 ~ mutate ~ params", params)
//     return run(
//       client(`projects/${params.id}`, { data: {"id": params.id, "pin": params.pin}, method: "PATCH" })
//     );
//   };
//   return {
//     mutate,
//     ...asyncResult
//   };
// }

// export const useAddProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, { data: params, method: "POST" })
//     );
//   };
//   return {
//     mutate,
//     ...asyncResult
//   };
// }
