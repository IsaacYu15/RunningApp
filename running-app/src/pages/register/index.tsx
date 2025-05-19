import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) 
      tryLogin();
    else
      trySignUp();
  };

  async function tryLogin() {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      console.log(response);
    } catch (error) {
      console.log("error with logging in");
    }
  }

  async function trySignUp() {
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      console.log(response);
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
