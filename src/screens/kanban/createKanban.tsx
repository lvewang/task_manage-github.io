import { Input } from "antd";
import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { KanbanColumnsContainer } from ".";
import { KanbanContainer } from "./kanban-column";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <KanbanContainer>
      {/* <KanbanColumnsContainer> */}
      <Input
        size={"large"}
        placeholder={"create new board"}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      {/* </KanbanColumnsContainer> */}
    </KanbanContainer>
  );
};
