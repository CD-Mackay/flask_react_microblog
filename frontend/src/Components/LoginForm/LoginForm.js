//Library Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styling Imports
import "./LoginForm.css";

// Component Imports
import Button from "../Button/Button";
import UseToken from "../UseToken";
import GetUser from "../GetUser";

const LoginForm = (
  // {setUser}
  ) => {
  const { saveToken } = UseToken();
  const { saveUser } = GetUser();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event) {
    event.preventDefault();
    console.log(event);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
    };
    fetch("/token", requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        console.log("login data", data, data.user)
        saveToken(data.access_token);
        saveUser(data.user)
        return navigate("/");
      })
      .catch((error) => {
        return console.log(error);
      });

    setLoginForm({
      email: "",
      password: "",
    });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <form className="login-form">
      <input
        onChange={handleChange}
        type="email"
        text={loginForm.email}
        name="email"
        placeholder="Email"
        value={loginForm.email}
      />
      <input
        onChange={handleChange}
        type="password"
        text={loginForm.password}
        name="password"
        placeholder="Password"
        value={loginForm.password}
      />

      <Button message="Login" onClick={(event) => handleLogin(event)} />
    </form>
  );
};

export default LoginForm;
