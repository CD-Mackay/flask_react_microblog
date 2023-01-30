import React, { useState } from "react";

const LoginForm = ({ setToken }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  function handleLogin(event){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password
      })
  };

    fetch('/token', requestOptions)
    .then((response) => {
      setToken(response.data.access_token)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    setLoginForm(({
      email: "",
      password: ""}))

    event.preventDefault()
  }

  function handleChange(event) { 
    const {value, name} = event.target
    setLoginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

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
