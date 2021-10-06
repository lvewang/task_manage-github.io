import * as auth from "AuthProvider";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { useQueryClient } from "react-query";
import { User } from "screens/ProjectListScreen/SearchPanel";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { http } from "../utils/http";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => {
    return auth.login(form).then(setUser);
  };
  const register = (form: AuthForm) => {
    return auth.register(form).then(setUser);
  };
  useMount(() => {
    run(bootstrapUser());
  });
  const queryClient = useQueryClient();

  const logout = () => {
    return auth.logout().then(() => {
      setUser(null);
    });
    queryClient.clear();
  };

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("must use useAuth in a context");
  }

  return context;
};
