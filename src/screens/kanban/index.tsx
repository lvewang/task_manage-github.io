import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useKanban } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [] } = useKanban(useKanbanSearchParams());

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} board</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
