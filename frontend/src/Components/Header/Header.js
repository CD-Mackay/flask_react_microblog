//Library Imports
import React from "react";

// Styling Imports
import "./Header.css";

// Component Imports
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import GetUser from "../GetUser";

const Header = ({ token, removeToken }) => {

  // const { id } = user;
  const { getUser, removeUser, user } = GetUser();
  console.log("header user", user);

  const handleLogout = () => {
    removeToken();
    removeUser();
  }

  return (
    <nav className="header-nav">
      <div><p>Welcome {user && user.username}!</p></div>
      <div className="button-wrapper">
        {token && <Button onClick={handleLogout} message="Logout" />}
        {token && (
          <Link to={`/user/${user && user.id}`}>
            <Button message="Profile" />
          </Link>
        )}
        {!token && (
          <>
            <Link to="/login">
              <Button message="Login" />
            </Link>
            <Link to="/register">
              <Button message="Register" />
            </Link>
          </>
        )}
        <Link to="/">
          <Button message="Home" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
