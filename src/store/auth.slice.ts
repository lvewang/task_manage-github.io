import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/ProjectListScreen/SearchPanel";
import * as auth from "AuthProvider";
import { AuthForm, bootstrapUser } from "context/AuthContext";
import { AppDispatch, RootState } from "store";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.login(form).then((user) => {
    debugger;
    dispatch(setUser(user));
  });
};

export const register = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.register(form).then((user) => dispatch(setUser(user)));
};

export const logout = () => (dispatch: AppDispatch) => {
  return auth.logout().then(() => dispatch(setUser(null)));
};

export const bootstrap = () => (dispatch: AppDispatch) => {
  return bootstrapUser().then((user) => dispatch(setUser(user)));
};
