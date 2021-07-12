import { Form, Select, Input } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchaPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchaPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchaPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="project name"
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">leader</Select.Option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
