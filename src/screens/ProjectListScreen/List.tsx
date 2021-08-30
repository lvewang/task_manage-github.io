import { Table, TableProps } from "antd";
import { spawn } from "child_process";
import dayjs from "dayjs";
import { User } from "./SearchPanel";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}
type PropsType = Omit<ListProps, "users">;
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "project name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      {...props}
    ></Table>
  );
};
