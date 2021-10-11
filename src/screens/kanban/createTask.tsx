import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksSearchKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksSearchKey());
  const [inputMode, setInputMode] = useState(false);
  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}> +create task</div>;
  }
  return (
    <Card>
      <Input
        size={"large"}
        placeholder={"create task"}
        autoFocus={true}
        onBlur={toggle}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></Input>
    </Card>
  );
};
