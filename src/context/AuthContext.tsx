import * as auth from "AuthProvider";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode, useCallback, useState } from "react";
import { User } from "screens/ProjectListScreen/SearchPanel";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { http } from "../utils/http";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

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

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  const logout = () => {
    return auth.logout().then(() => setUser(null));
  };

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  const user = useSelector(authStore.selectUser);
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return { user, login, register, logout };
};
