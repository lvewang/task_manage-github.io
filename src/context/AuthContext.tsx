import React, { ReactNode } from "react";
import { useState } from "react";
import * as auth from "AuthProvider";
import { User } from "screens/ProjectListScreen/SearchPanel";

interface AuthForm {
  username: string;
  password: string;
}
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
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => {
    return auth.login(form).then(setUser);
  };
  const register = (form: AuthForm) => {
    return auth.register(form).then(setUser);
  };

  const logout = () => {
    return auth.logout().then(() => setUser(null));
  };
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
