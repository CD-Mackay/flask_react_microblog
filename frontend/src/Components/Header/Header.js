//Library Imports
import React from "react";

// Styling Imports
import "./Header.css";

// Component Imports
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Header = ({ token, removeToken, user }) => {

  const { id } = user;

  return (
    <nav className="header-nav">
      <div><p>Welcome {user.username}!</p></div>
      <div className="button-wrapper">
        {token && <Button onClick={removeToken} message="Logout" />}
        {token && (
          <Link to={`/user/${id}`}>
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
