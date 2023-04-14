//Library Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styling Imports
import "./RegisterForm.css";

// Component Imports
import Button from "../Button/Button";
import UseToken from "../UseToken";

const RegisterForm = () => {
  const { saveToken } = UseToken();
  const navigate = useNavigate();

  const [RegisterForm, setRegisterForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleRegister(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: RegisterForm.email,
        password: RegisterForm.password,
        username: RegisterForm.username
      }),
    };

    fetch("/register", requestOptions)
      .then((response) => {
        console.log("response", response)
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        saveToken(data.access_token);
        return navigate("/");
      })
      .catch((error) => {
        return console.log(error);
      });

    setRegisterForm({
      email: "",
      password: "",
      username: "",
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setRegisterForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <form className="Register-form">
      <input
        onChange={handleChange}
        type="email"
        text={RegisterForm.email}
        name="email"
        placeholder="Email"
        value={RegisterForm.email}
      />
      <input
        onChange={handleChange}
        type="text"
        text={RegisterForm.username}
        name="username"
        placeholder="username"
        value={RegisterForm.username}
      />
      <input
        onChange={handleChange}
        type="password"
        text={RegisterForm.password}
        name="password"
        placeholder="Password"
        value={RegisterForm.password}
      />

      <Button message="Register" onClick={handleRegister} />
    </form>
  );
};

export default RegisterForm;
