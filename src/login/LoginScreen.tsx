import { FormEvent } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export const Login = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
        console.log("loggedin");
      }
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
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
        <button type="submit"> Login </button>
      </div>
    </form>
  );
};
