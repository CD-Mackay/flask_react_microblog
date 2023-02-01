import React from "react";

const Header = ({ token, removeToken }) => {
  console.log(token)
  return (
    <nav>
      I am header
      {token && <button onClick={removeToken}>Logout</button>}
    </nav>
  );
};

export default Header;
