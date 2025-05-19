import React, { useState } from "react";
import { ServerRoutes as ServerRouteName } from "../../constants/routes"

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tryRegister();
  };

  async function tryRegister() {

    const route = isLogin ? ServerRouteName.LOGIN : ServerRouteName.SIGNUP;

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data: { success: boolean } = await response.json();
      console.log(data.success);
      
    } catch (error) {
      console.log("error with logging in");
    }
  }
  
  return (
    <section>
      <h1> {isLogin ? "Login" : "Sign Up"}</h1>
      <button onClick={() => setIsLogin((currState) => !currState)}>
        toggle
      </button>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </section>
  );
};

export default Login;
