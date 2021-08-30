import styled from "@emotion/styled";
import { Typography } from "antd";
import { useState } from "react";
import { useDebounce } from "utils";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUser();

  return (
    <Container>
      <h1>Project list</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
