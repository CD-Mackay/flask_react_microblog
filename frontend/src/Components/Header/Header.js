import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ token, removeToken, setShowLogin }) => {
  return (
    <nav className="header-nav">
      <div></div>
      <div className="button-wrapper">
        {token && <button onClick={removeToken}>Logout</button>}
        {!token && (
          <Link to="/login">
            <button>Login?</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
