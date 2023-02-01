import React from "react";
import "./Header.css";

const Header = ({ token, removeToken, setShowLogin }) => {
  console.log(token);
  return (
    <nav className="header-nav">
      <div></div>
      <div className="button-wrapper">
        {token && <button onClick={removeToken}>Logout</button>}
        {!token && <button onClick={() => setShowLogin(true)}>Login</button>}
      </div>
    </nav>
  );
};

export default Header;
