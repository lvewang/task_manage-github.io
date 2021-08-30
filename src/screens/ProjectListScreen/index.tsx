import styled from "@emotion/styled";
import { Typography } from "antd";
import * as qs from "qs";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();
  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>Project list</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
