import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useKanban } from "utils/kanban";
import { useTask } from "utils/task";
import { CreateKanban } from "./createKanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [] } = useKanban(useKanbanSearchParams());
  const { isLoading: kanbanIsLoading } = useKanban(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTask(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} board</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <KanbanColumnsContainer>
          {kanbans.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))}
          <CreateKanban />
        </KanbanColumnsContainer>
      )}
    </ScreenContainer>
  );
};

export const KanbanColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
