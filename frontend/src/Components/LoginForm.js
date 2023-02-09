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

 async function handleLogin(event) {
  event.preventDefault()
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
    };

    fetch("/token", requestOptions)
    .then(response =>  { return response.json()} )
    .then(data => { return saveToken(data.access_token)})
    .catch(error => console.log(error))
    

    setLoginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
    return navigate('/')
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
