import { Authenticated } from "Authenticated/Authenticated";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { useAuth } from "context/AuthContext";
import React from "react";
import { UnAuthenticated } from "UnAuthenticated";
import "./App.css";
// import { TsReactTest } from "./TsReactTest";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <Authenticated /> : <UnAuthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
