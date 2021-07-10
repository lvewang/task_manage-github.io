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
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
        <select
          value={param.personId}
          onChange={(e) => setParam({ ...param, personId: e.target.value })}
        >
          <option value="">leader</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
