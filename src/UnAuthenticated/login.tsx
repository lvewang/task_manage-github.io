import { useAuth } from "context/AuthContext";
import { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "UnAuthenticated";

export const Login = () => {
  const { login, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please input user name" }]}
      >
        <Input placeholder={"user name"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "please input password" }]}
      >
        <Input placeholder={"password"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          {" "}
          Login{" "}
        </LongButton>
      </Form.Item>
    </Form>
  );
};
