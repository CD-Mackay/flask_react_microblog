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
            <Button>Login?</Button>
          </Link>
        )}
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
