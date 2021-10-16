import styled from "@emotion/styled";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTasksModal, useTasksSearchKey } from "./util";

const { confirm } = Modal;
export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksSearchKey()
  );

  const { mutateAsync: deleteTask } = useDeleteTask(useTasksSearchKey());
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  const onCancel = () => {
    close();

    form.resetFields();
  };

  const startDelete = () => {
    close();
    confirm({
      title: "Do you Want to delete the task?",
      content: "This will delete the task",
      cancelText: "Cancel",
      onOk() {
        deleteTask({ id: Number(editingTaskId) });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      okText="Ok"
      cancelText="Cancel"
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={editLoading}
      title={"editing task"}
      visible={!!editingTaskId}
    >
      <Form form={form} initialValues={editingTask}>
        <Form.Item
          label={"task name"}
          name={"name"}
          rules={[{ required: true, message: "please input task name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"processed by"} name={"processorId"}>
          <UserSelect defaultOptionName={"processed by"} />
        </Form.Item>
        <Form.Item label={"type"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => startDelete()}
            style={{ fontSize: "14px" }}
            size={"small"}
          >
            Delete
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
