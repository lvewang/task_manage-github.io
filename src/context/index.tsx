import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter as Router } from "react-router-dom";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
        )
      </QueryClientProvider>
    </Provider>
  );
};
