import React from "react";
import { List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
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
        {props.projectButton}
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
