import styled from "@emotion/styled";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();

  const queryKey = useProjectQueryKey();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(queryKey);
  const [form] = useForm();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  const closeModal = () => {
    form.resetFields();
    close();
  };
  const title = editingProject ? "Editing project" : "Create project";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={closeModal}>
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Container>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"Name"}
              name={"name"}
              rules={[{ required: true, message: "Please input project name" }]}
            >
              <Input placeholder={"Please input project name"} />
            </Form.Item>
            <Form.Item
              label={"Department"}
              name={"organization"}
              rules={[
                { required: true, message: "Please input organization name" },
              ]}
            >
              <Input placeholder={"Please input organization name"} />
            </Form.Item>
            <Form.Item
              label={"Manager"}
              name={"personId"}
              rules={[{ required: true, message: "Please input manager name" }]}
            >
              <UserSelect defaultOptionName={"Manager"} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                {" "}
                submit
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;
