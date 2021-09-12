import { Button, Form, Input } from "antd";
import { useAuth } from "context/AuthContext";
import { useAsync } from "utils/useAsync";

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (values.password !== cpassword) {
      onError(new Error("please confirm password and cpassword are the same"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e as Error);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "please confirm password" }]}
      >
        <Input placeholder={"password"} type="password" id={"cpassword"} />
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
