import { useAuth } from "context/AuthContext";
import { FormEvent } from "react";

export const Register = () => {
  const { register, user } = useAuth();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username"> name </label>
        <input type="text" id={"username"} />
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id={"password"} />
        </div>
      </div>
      <div>
        <button type="submit"> Register </button>
      </div>
    </form>
  );
};
