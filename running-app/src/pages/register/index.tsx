import React, { useEffect, useState } from "react";
import { RegisterRoutes as RegisterRoutes } from "../../constants/routes";
import { User as User } from "../../constants/user";

const Login = () => {
  //input fields
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  //session details
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<User>();

  useEffect(() => {
    fetchSession();
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tryRegister();
  };

  async function tryRegister() {
    const route = isSignUp ? RegisterRoutes.SIGNUP : RegisterRoutes.LOGIN;

    const user = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("error with logging in");
    }

    fetchSession();
  }

  async function fetchSession() {
    try {
      const response = await fetch(RegisterRoutes.FETCHSESSION, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      //set session data, if available
      const data = await response.json();
      const loggedIn = data.loggedIn;
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const user: User = {
          name: data.user.username,
          email: data.user.email,
        };
        setUserDetails(user);
      }

    } catch (error) {
      console.log("error with fetching session data");
    }
  }

  return (
    <section>
      <h1> {isLoggedIn ? "Sign Out" : isSignUp ? "Sign Up" : "Login"}</h1>
      <button onClick={() => setIsSignUp((currState) => !currState)}>
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
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
