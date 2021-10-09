import styled from "@emotion/styled";
import React from "react";
import { useKanban } from "utils/kanban";
import { useDocumentTitle } from "utils/useDocumentTitle";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  const title = useDocumentTitle("Project board");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [] } = useKanban(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}</h1>
      <ColumnsContainer>
        {kanbans.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  overflow: hidden;
`;
