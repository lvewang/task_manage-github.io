import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      name: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };
  return (
    <Row gap={true} marginBottom={4}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"task name"}
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={"processed by"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"task type"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <Button onClick={reset}>clear search</Button>
    </Row>
  );
};
