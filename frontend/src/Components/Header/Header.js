import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Header = ({ token, removeToken, setShowLogin }) => {
  return (
    <nav className="header-nav">
      <div></div>
      <div className="button-wrapper">
        {token && <Button onClick={removeToken}>Logout</Button>}
        {!token && (
          <Link to="/login">
            <Button message="Login" />
          </Link>
        )}
        <Link to="/">
          <Button message="Home" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
