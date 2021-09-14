import styled from "@emotion/styled";
import { Typography, Button } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { useDispatch } from "react-redux";
import { useDebounce } from "utils";
import { useProjects } from "utils/project";
import { useDocumentTitle } from "utils/useDocumentTitle";
import { useUser } from "utils/user";
import { List } from "./List";
import { projectListActions } from "./project-list.slice";
import { SearchPanel } from "./SearchPanel";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  const dispatch = useDispatch();

  useDocumentTitle("Project list", false);

  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUser();

  return (
    <Container>
      <Row between={true}>
        <h1>Project list</h1>
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          Create project
        </ButtonNoPadding>
      </Row>

      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
