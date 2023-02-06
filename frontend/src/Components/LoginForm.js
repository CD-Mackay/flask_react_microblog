import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseToken from "./UseToken";

const LoginForm = () => {
  const { saveToken, getToken } = UseToken();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
    };

    try {
      let response = fetch("/token", requestOptions);
      console.log(response) // Return promise <pending /> Async issue?
      console.log(response.access_token)
      saveToken(response.access_token);
      // return navigate("/");
      event.preventDefault()
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.headers);
    }

    setLoginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <form>
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

      <button onClick={handleLogin}>Submit</button>
    </form>
  );
};

export default LoginForm;
