import { Dropdown, Menu, Table, TableProps } from "antd";
import confirm from "antd/lib/modal/confirm";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Project } from "../../types/Project";
import { User } from "../../types/User";
import { useProjectModal, useProjectQueryKey } from "./util";
interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  const queryKey = useProjectQueryKey();
  const { mutate } = useEditProject(queryKey);
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "project name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "department",
          dataIndex: "organization",
        },
        {
          title: "manager",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
        {
          title: "created time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "N/A"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const editProject = (id: number) => () => startEdit(id);
  const { startEdit } = useProjectModal();
  const queryKey = useProjectQueryKey();
  const { mutate: deleteProject } = useDeleteProject(queryKey);
  const confirmDeleteProject = (id: number) => () => {
    confirm({
      title: "do you really want to delete this project",
      content: "click confirm to delete",
      okText: "confirm",

      onOk: () => {
        deleteProject(id);
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            Edit project
          </Menu.Item>
          <Menu.Item onClick={confirmDeleteProject(project.id)} key={"delete"}>
            Delete project
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
