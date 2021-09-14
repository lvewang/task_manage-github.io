import styled from "@emotion/styled";
import { List, Popover, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/ProjectListScreen/project-list.slice";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>favorit project</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => {
          return (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          );
        })}
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          Create project
        </ButtonNoPadding>
      </List>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      projects
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
