//Library Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Styling Imports
import "./RegisterForm.css";

// Component Imports
import Button from "../Button/Button";
import UseToken from "../UseToken";
import ShowError from "../ShowError/ShowError";

const RegisterForm = () => {
  const { saveToken } = UseToken();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
        username: RegisterForm.username,
      }),
    };

    fetch("/register", requestOptions)
      .then((response) => {
        if (!response.ok) {
          let errorResponse = response.headers.get("customheader");
          setErrorMessage(errorResponse);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        saveToken(data.access_token);
        return navigate("/");
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
    <form className="register-form">
      <p>
        Register your account to start posting about Flask, React, or anything
        more interesting.
      </p>
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
      <div className="register-buttons">
        <Button message="Register" onClick={handleRegister} />
        <Link to="/login">
          <Button message="Already have an account?" />
        </Link>
      </div>
      <ShowError message={errorMessage} />
    </form>
  );
};

export default RegisterForm;
