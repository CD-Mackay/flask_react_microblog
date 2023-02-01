import React from "react";

const Header = ({ token }) => {
  console.log(token)
  return (
    <nav>
      I am header
      {token && <button>Logout</button>}
    </nav>
  );
};

export default Header;
