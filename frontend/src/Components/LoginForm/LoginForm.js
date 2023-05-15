//Library Imports
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Styling Imports
import "./LoginForm.css";

// Component Imports
import Button from "../Button/Button";
import UseToken from "../UseToken";
import GetUser from "../GetUser";
import ShowError from "../ShowError/ShowError";
import { UserContext } from "../../Contexts/UserContext";

const LoginForm = () => {
  const { saveToken } = UseToken();
  const { saveUser } = GetUser();
  const navigate = useNavigate();
  const { fetchUserProfile } = useContext(UserContext)

  const [errorMessage, setErrorMessage] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event) {
    event.preventDefault();
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
        if (!response.ok) {
          setErrorMessage("Wrong username or password");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        saveToken(data.access_token);
        saveUser(data.user);
        fetchUserProfile(data.user, data.access_token);
        return navigate("/");
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
      <div className="button-wrapper">
        <Button message="Login" onClick={(event) => handleLogin(event)} />
        <Link to="/register">
          <Button message="Don't have an account?" />
        </Link>
      </div>
      <ShowError message={errorMessage} />
    </form>
  );
};

export default LoginForm;
