import { useAuth } from "context/AuthContext";
import { FormEvent } from "react";
import { Form, Input, Button } from "antd";

export const Register = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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
        <Button htmlType={"submit"} type={"primary"}>
          {" "}
          Register{" "}
        </Button>
      </Form.Item>
    </Form>
  );
};
