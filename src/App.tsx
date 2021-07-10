import { Authenticated } from "Authenticated/Authenticated";
import { useAuth } from "context/AuthContext";
import React from "react";
import { ProjectListScreen } from "screens/ProjectListScreen";
import { UnAuthenticated } from "UnAuthenticated";
import "./App.css";
// import { TsReactTest } from "./TsReactTest";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <Authenticated /> : <UnAuthenticated />}
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <TsReactTest /> */}
    </div>
  );
}

export default App;
