import { useAuth } from "context/AuthContext";
import { ProjectListScreen } from "screens/ProjectListScreen";

export const Authenticated = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ProjectListScreen />
      <button onClick={logout}> logout</button>
    </div>
  );
};
