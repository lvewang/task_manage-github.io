import React from "react";
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";

export const UnAuthenticated = () => {
  const [isRegister, setIsRegister] = useState(false);
  const handleClick = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={handleClick}>
        <span>switch to</span> {isRegister ? "login" : "register"}
      </button>
    </div>
  );
};
