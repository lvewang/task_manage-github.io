import { Drawer, Button } from "antd";
import React from "react";
import { useProjectModal } from "utils/url";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={close}>
      <h1> Project Modal</h1>
      <Button onClick={close}> close Modal</Button>
    </Drawer>
  );
};
