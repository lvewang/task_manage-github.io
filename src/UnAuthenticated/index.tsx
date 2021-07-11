import React from "react";
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import { Card } from "antd";
import styled from "@emotion/styled";

export const UnAuthenticated = () => {
  const [isRegister, setIsRegister] = useState(false);
  const handleClick = () => {
    setIsRegister(!isRegister);
  };
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <ShadowCard>
        {isRegister ? <Register /> : <Login />}
        <button onClick={handleClick}>
          <span>switch to</span> {isRegister ? "login" : "register"}
        </button>
      </ShadowCard>
    </Container>
  );
};

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: comumn;
  align-items: center;
  min-height: 100vh;
`;
