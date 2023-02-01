
import React from "react";

const Header = ({ token, removeToken, setShowLogin}) => {
  console.log(token)
  return (
    <nav>
      I am header
      {token && <button onClick={removeToken}>Logout</button>}
      {!token && <button onClick={() => setShowLogin(true)}>Login</button>}
    </nav>
  );
};

export default Header;
